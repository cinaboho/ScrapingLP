puts 'Avance Proyecto Scraping Muñoz Viviana'

require 'open-uri'
require 'nokogiri'
require 'csv'

link = 'https://gamehag.com/forum/fortnite?page='

class Pregunta
  attr_accessor :titulo, :autor, :edad, :link, :fecha, :respuestas, :imagen, :juegosRecientes

  def initialize(titulo, autor, edad, link, fecha, respuestas, imagen, juegosRecientes)
    @titulo = titulo
    @autor = autor
    @edad = edad
    @link = link
    @fecha = fecha
    @respuestas = respuestas
    @imagen = imagen
    @juegosRecientes = juegosRecientes
  end

  def guardar
    CSV.open('viviana_questions.csv', 'a') do |csv|
      csv << [titulo.to_s, autor.to_s, edad.to_s, link.to_s, fecha.to_s, respuestas.to_s, imagen.to_s, juegosRecientes.to_s]
    end
  end

  def guardarQuestion1
    tituloFortnite = ''
    fechaFortnite = ''
    if titulo.to_s.downcase.include?('fortnite') || titulo.to_s.downcase.include?('fornite')
      tituloFortnite = titulo.to_s
      fechaFortnite =
        if fecha.to_s.downcase.include?('2 years')
          '2020'
        elsif fecha.to_s.downcase.include?('1 year')
          '2021'
        elsif fecha.to_s.downcase.include?('months ago') || fecha.to_s.downcase.include?('3 weeks ago')
          '2022'
        elsif fecha.to_s.downcase.include?('3 years ago')
          '2019'
        elsif fecha.to_s.downcase.include?('4 years ago')
          '2018'
        else
          '2023'
        end
      CSV.open('1viviana_question.csv', 'a') do |csv|
        csv << [tituloFortnite.to_s, fechaFortnite.to_s]
      end
    end
  end

  def guardarQuestion2
    CSV.open('2viviana_question.csv', 'a') do |csv|
      csv << [autor.to_s, juegosRecientes.to_s]
    end
  end

  def guardarQuestion3
    CSV.open('3viviana_question.csv', 'a') do |csv|
      csv << [autor.to_s, edad.to_s]
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
    titulo = pregunta.css('.thread-name').css('a').inner_text.gsub(',', '').gsub('""', '')
    autor = pregunta.css('.name').css('.text').inner_text
    edad = ''
    recientes = ''
    unless autor.to_s.include?('[')
      puts autor
      stackHTML2 = URI.open('https://gamehag.com/profile/' + autor.downcase)
      datos2 = stackHTML2.read
      parsed_content2 = Nokogiri::HTML(datos2)
      edad = parsed_content2.css('.container').css('.toolbar').css('dl:nth-child(2)').css('dd').inner_text
      parsed_content2.css('.row.tile-grid.small-gutters.clear-last').each do |juego|
        reciente = juego.css('.col.col-12.col-md-6.col-lg-12.col-xl-6').css('.game-name').inner_text
        recientes += reciente
        recientes += '|'
        puts reciente
        # gets
      end
    end
    link = pregunta.css('.thread-name').css('a').attr('href').inner_text
    imagen = 'https://gamehag.com' + pregunta.css('.avatar-badge').css('img').attr('src').inner_text
    respuestas = pregunta.css('dd').inner_text
    fecha = pregunta.css('.date').inner_text
    # puts autor
    # puts fecha
    # puts pregunta
    # puts nrespuestas
    # gets
    pregunta = Pregunta.new(titulo, autor, edad, link, fecha, respuestas, imagen, recientes)
    pregunta.guardar
    pregunta.guardarQuestion1
    pregunta.guardarQuestion2
    pregunta.guardarQuestion3
  end
end

CSV.open('viviana_questions.csv', 'wb') do |csv|
  csv << %w[Titulo Autor Edad Link Fecha Respuestas Imagen JuegosRecientes]
end
CSV.open('1viviana_question.csv', 'wb') do |csv|
  csv << %w[Titulo Fecha]
end
CSV.open('2viviana_question.csv', 'wb') do |csv|
  csv << %w[Nickname Fecha]
end
CSV.open('3viviana_question.csv', 'wb') do |csv|
  csv << %w[Nickname Edad]
end

(1..92).each do |i|
  puts i
  parsear(link + i.to_s)
  puts "\nnueva pagina"
end
