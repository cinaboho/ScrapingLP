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
    CSV.open('dashboard/lopez/johanna_questions.csv', 'ab') do |csv|
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

CSV.open('dashboard/lopez/johanna_questions.csv', 'wb') do |csv|
  csv << %w[Titulo Autor Link Fecha Respuestas Visitas]
end

(1..20).each do |i|
  parsear(link + i.to_s)
end