puts 'Avance Proyecto Scraping Muñoz Viviana'

require 'open-uri'
require 'nokogiri'
require 'csv'

link = "https://gamehag.com/forum/fortnite?page="

class Pregunta
  attr_accessor :titulo, :autor, :link, :fecha, :respuestas, :imagen

  def initialize(titulo, autor, link, fecha, respuestas, imagen)
    @titulo = titulo
    @autor = autor
    @link = link
    @fecha = fecha
    @respuestas = respuestas
    @imagen = imagen

  end

  def guardar
    CSV.open('viviana_questions.csv', 'a') do |csv|
      csv << [titulo.to_s, autor.to_s, link.to_s, fecha.to_s, respuestas.to_s,imagen.to_s]
    end
  end
end


def parsear(linkparsear)
  stackHTML = URI.open(linkparsear)
  datos = stackHTML.read
  parsed_content = Nokogiri::HTML(datos)
   # print(parsed_content)
  post = parsed_content.css('.card-body')
  post.css('.single-thread.single-thread-compact-xs.single-thread-compact-sm').each do |pregunta|

    titulo = pregunta.css('.thread-name').css('a').inner_text
    autor = pregunta.css('.name').css('.text').inner_text
    link = pregunta.css('.thread-name').css('a').attr('href').inner_text

    imagen = 'https://gamehag.com' + pregunta.css('.avatar-badge').css('img').attr('src').inner_text
    respuestas = pregunta.css('dd').inner_text
    fecha = pregunta.css('.date').inner_text
    #puts autor
    #puts fecha
    #puts pregunta
    #puts nrespuestas
		#gets
    pregunta = Pregunta.new(titulo, autor, link, fecha, respuestas, imagen)
    pregunta.guardar
  end
end


 CSV.open("viviana_questions.csv","wb") do |csv|
			csv << %w[Titulo Autor Link Fecha Respuestas Imagen]
end

(1..41).each do |i|
  parsear(link + i.to_s)
  puts "\nnueva pagina"
end
