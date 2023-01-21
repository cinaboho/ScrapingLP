puts 'Scraper adslzone'

require 'open-uri' # consultar a la plataforma
require 'nokogiri' # formatear, parsear a html
require 'csv' # escribir y leer csv

# link = 'https://www.adslzone.net/foro/videojuegos-y-consolas.58/page-1'
link = 'https://www.adslzone.net/foro/videojuegos-y-consolas.58/page-'

class Pregunta
  attr_accessor :titulo, :autor, :link, :fecha, :respuestas, :visitas

  def initialize(titulo, autor, link, fecha, respuestas, visitas)
    @titulo = titulo
    @autor = autor
    @link = link
    @fecha = fecha
    @respuestas = respuestas
    @visitas = visitas
  end

  def guardar
    CSV.open('johanna_questions.csv', 'ab') do |csv|
      csv << [titulo.to_s, autor.to_s, link.to_s, fecha.to_s, respuestas.to_s, visitas.to_s]
    end
  end
end

def parsear(linkparsear)
  stackHTML = URI.open(linkparsear)
  datos = stackHTML.read
  parsed_content = Nokogiri::HTML(datos)
  post = parsed_content.css('.structItemContainer')
  post.css('.structItem').each do |pregunta|
    next unless pregunta.css('div:nth-child(1)').length > 1

    titulo = pregunta.css('.structItem-title').css('a').inner_text.gsub("\n", '').gsub(/\s+/, ' ').strip
    autor = pregunta.css('.structItem-minor').css('ul').css('li')[0].css('a').css('span')[0].inner_text
    link = 'https://www.adslzone.net/' + pregunta.css('.structItem-title').css('a').attr('href').inner_text
    respuestas = pregunta.css('.structItem-cell').css('.pairs')[0].css('dd').inner_text.gsub(',', '')
    visitas = pregunta.css('.structItem-cell').css('.pairs')[1].css('dd').inner_text.gsub(',', '')
    fecha = pregunta.css('.structItem-minor').css('ul').css('li')[1].css('a').css('time')[0].attr('datetime')[0..9]
    pregunta = Pregunta.new(titulo, autor, link, fecha, respuestas, visitas)
    pregunta.guardar
  end
end

CSV.open('johanna_questions.csv', 'wb') do |csv|
  csv << %w[Titulo Autor Link Respuestas Visitas]
end

(1..3).each do |i|
  parsear(link + i.to_s)
end

data = CSV.parse(File.read('johanna_questions.csv'), headers: true)

#Pregunta 1: ¿Cuál es la cantidad de preguntas que hacen referencias a las diferentes versiones de PlayStation? (Nota: preguntas que contengan las siguientes palabras PS1, PS2, PS3, PS4, PS5). 

puts "\nCantidad de Preguntas PS"

(1..5).each do |i|
  #filtramos con select
  #upcase para convertir todo a mayuscula para hacer bien la comparacion
  #con include lo que contenga la palabra PS1,2,3,4,5
  dataPS = data.select { |item| item['Titulo'].upcase.include?('PS' + i.to_s) }
  print('PS' + i.to_s + ' - ' + dataPS.count.to_s)
  print("\n")
end

#Pregunta 2: ¿Cuál es el ranking de los cinco usuarios que más preguntas han generado? 


#data.each do |pregunta|
#  puts pregunta['Autor']
#end

#https://www.iteramos.com/pregunta/102231/como-agrupar-por-conteo-en-array-sin-utilizar-el-bucle
# segun ejemplo se puede agrupar y sumar su contenido
# lo que entendi es que agrupa y en el mapeo suma
result=Hash[data.group_by{|x|x['Autor']}.map{|k,v| [k,v.size]}]
#result.each do |key, value|
#    puts "#{key}:#{value}"
#end

#ordenamos los usuarios
rankingUsuarios=result.sort {|a1,a2| a2[1]<=>a1[1]}

puts "\nRanking 5 de Usuarios"
for x in (0..4)
  puts "Rank # #{x+1}"
  puts "Usuario: "+rankingUsuarios[x][0].to_s
  puts "Numero: "+rankingUsuarios[x][1].to_s
end


#Pregunta 3: ¿Cuál es la cantidad de pregunta que se realizaron en los años 2020, 2021, 2022? 