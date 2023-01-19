require 'nokogiri'
require 'open-uri'
require 'pp'
# download/cache the data (to speed up testing)
unless File.readable?('data.html')
  url = 'https://www.bananatic.com/de/forum/games/'
  data = URI.open(url).read
  File.open('data.html', 'wb') { |f| f << data }
end
data = File.read('data.html')
document = Nokogiri::HTML(data)

# Pregunta 1
print('---------------PREGUNTA 1-------------------')
puts("\n")
print('Pregunta 1: ¿Cómo se llaman los juegos más discutidos en este foro y su número total de preguntas?; Es decir,los nombres de los juegos que han sido tema de discusión desde la creación del foro con su respectivo total de preguntas')
puts("\n")
print('--------------------------------------------')
puts("\n")
puts("\n")

links = document.css('.categories ul li a')
result = links.map do |link|
  name, count = link.children
  [name.text.strip, count.text.to_i]
end

p result
puts("\n")
print('-------PREGUNTA 2-<div> view-------')
puts("\n")
links2 = document.css('.topics ul li div')
# print links2
puts("-----------------\n\n\n")
res = links2.map do |lk|
  views = lk.css('.views')
  print views
  puts("\n")
  replies = lk.css('.replies')
  print replies
  # puts '[' + views + ',' + replies + ']' + "\n"
  # [replies, views]
  # replies = lk.css('.replies').inner_text
  # views = lk.css('.views').inner_text
  # [replies, views]
end
# p re me imprie las vistas y las respuestas eeen un array pero falta segmmentar solo las del 2022
# p res

#--------------------------------
# links3 = document.css('.topics ul li div')
# re = links3.map do |lk3|
#   name = lk3.css('.name').children.text.strip.split("\n")[2]
# end

# # Aqui hago  extraccion de fechas
# date = ' '
# size_dates = re.length
# (0..size_dates).each do |i|
#   unless i.nil?
#     date = re[i]
#     print date
#   end
# end

per = document.xpath('//div[@class="name"]/text()[string-length(normalize-space(.)) > 0]')
              .map { |node| node.to_s[/\d{4}/] }

p per
