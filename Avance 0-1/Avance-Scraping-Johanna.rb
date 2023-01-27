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
    # Verificamos que dentro exista un div creo que es para poner zonas como tipo vip y existen zonas vacias para que no salga error en el scrapeo
    next unless pregunta.css('div:nth-child(1)').length > 1

    # Extraemos el titulo de la pregunta y le quitamos saltos de lineas y caracteres raros
    titulo = pregunta.css('.structItem-title').css('a').inner_text.gsub("\n", '').gsub(/\s+/, ' ').strip
    autor = pregunta.css('.structItem-minor').css('ul').css('li')[0].css('a').css('span')[0]
    # verificamos si es nil xq ya que puede ser un usuario anonimo y no va tener contenido
    autor = if autor.nil?
              'Anonymous'
            else
              autor.inner_text
            end
    # extraemos el link de la pregunta
    link = 'https://www.adslzone.net/' + pregunta.css('.structItem-title').css('a').attr('href').inner_text
    # extraemos la cantidad de respuestas pero le quitamos la coma de miles
    respuestas = pregunta.css('.structItem-cell').css('.pairs')[0].css('dd').inner_text.gsub(',', '')
    # extraemos la cantidad de visitas pero le quitamos la coma de miles
    visitas = pregunta.css('.structItem-cell').css('.pairs')[1].css('dd').inner_text.gsub(',', '')
    fecha = pregunta.css('.structItem-minor').css('ul').css('li')[1].css('a').css('time')[0].attr('datetime')[0..9]
    pregunta = Pregunta.new(titulo, autor, link, fecha, respuestas, visitas)
    pregunta.guardar
  end
end

CSV.open('johanna_questions.csv', 'wb') do |csv|
  csv << %w[Titulo Autor Link Fecha Respuestas Visitas]
end

(1..10).each do |i|
  parsear(link + i.to_s)
end

# def cabecera(archivo)
#   CSV.open(archivo, 'wb') do |csv|
#     csv << %w[Nombre Valor]
#   end
# end
#
# def guardar(archivo, nombre, valor)
#   CSV.open(archivo, 'ab') do |csv|
#     csv << [nombre.to_s, valor.to_s]
#   end
# end
# data = CSV.parse(File.read('johanna_questions.csv'), headers: true)
#
#
# Pregunta 1: ¿Cuál es la cantidad de preguntas que hacen referencias a las diferentes versiones de PlayStation? (Nota: preguntas que contengan las siguientes palabras PS1, PS2, PS3, PS4, PS5).
#
# puts "\nCantidad de Preguntas PS"
# archivo='johanna_estadisticas_ps.csv'
# cabecera(archivo)
# (1..5).each do |i|
#   # filtramos con select
#   # upcase para convertir todo a mayuscula para hacer bien la comparacion
#   # con include lo que contenga la palabra PS1,2,3,4,5
#   dataPS = data.select { |item| item['Titulo'].upcase.include?('PS' + i.to_s) }
#   guardar(archivo,'PS' + i.to_s,dataPS.count.to_s)
#   print('PS' + i.to_s + ' - ' + dataPS.count.to_s)
#   print("\n")
# end
#
# Pregunta 2: ¿Cuál es el ranking de los cinco usuarios que más preguntas han generado?
#
# data.each do |pregunta|
#  puts pregunta['Autor']
# end
#
# https://www.iteramos.com/pregunta/102231/como-agrupar-por-conteo-en-array-sin-utilizar-el-bucle
# segun ejemplo se puede agrupar y sumar su contenido
# lo que entendi es que agrupa y en el mapeo suma
# result = Hash[data.group_by { |x| x['Autor'] }.map { |k, v| [k, v.size] }]
# result.each do |key, value|
#    puts "#{key}:#{value}"
# end
#
# ordenamos los usuarios
# rankingUsuarios = result.sort { |a1, a2| a2[1] <=> a1[1] }
# archivo='johanna_estadisticas_ranking.csv'
# cabecera(archivo)
# puts "\nRanking 5 de Usuarios"
# (0..4).each do |x|
#   puts "Rank # #{x + 1}"
#   puts 'Usuario: ' + rankingUsuarios[x][0].to_s
#   puts 'Numero: ' + rankingUsuarios[x][1].to_s
#   guardar(archivo,rankingUsuarios[x][0].to_s,rankingUsuarios[x][1].to_s)
# end
#
# Pregunta 3: ¿Cuál es la cantidad de pregunta que se realizaron en los años 2020, 2021, 2022?
#
# puts "\nCantidad Preguntas años 2020, 2021, 2022"
# archivo='johanna_estadisticas_anios.csv'
# cabecera(archivo)
# (2020..2022).each do |i|
#   # filtramos con select
#   # con include lo que contenga la palabra 2020, 2021, 2022
#   dataPS = data.select { |item| item['Fecha'].include?(i.to_s) }
#   guardar(archivo,'Año ' + i.to_s,dataPS.count.to_s)
#   print('Año ' + i.to_s + ' - ' + dataPS.count.to_s)
#   print("\n")
# end
