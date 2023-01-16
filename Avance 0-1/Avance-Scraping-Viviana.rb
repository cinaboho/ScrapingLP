puts 'Avance Proyecto Scraping Muñoz Viviana'

require 'open-uri'
require 'nokogiri'
require 'csv'

 CSV.open("viviana_questions.csv","wb") do |csv|
			csv << %w[Autor fecha pregunta nrespuestas]
end

def scraping(linkParsear)
  stackHTML = URI.open(linkParsear)
  datos = stackHTML.read
  parsed_content = Nokogiri::HTML(datos)
  # print(parsed_content)
  box = parsed_content.css('.card-body')
  # puts box
  box.css('.single-thread.single-thread-compact-xs.single-thread-compact-sm').each do |question|
    autor = question.css('.name').css('.text').inner_text
    fecha = question.css('.date').inner_text
    pregunta = question.css('.thread-name').css('a').inner_text
    nrespuestas = question.css('dd').inner_text
    puts autor
    puts fecha
    puts pregunta
    puts nrespuestas
		#gets
		CSV.open("viviana_questions.csv", "a") do |csv| 
			csv << [autor.to_s, fecha.to_s, pregunta.to_s, nrespuestas.to_s]
		end
    
  end
end

pagina = 1
for i in(1..41)#se guardaran datos de 40 páginas, por ahora:)
	link = "https://gamehag.com/forum/fortnite?page=#{pagina}"
	scraping(link) 
	pagina+=1
	puts "\nnueva pagina"
end
