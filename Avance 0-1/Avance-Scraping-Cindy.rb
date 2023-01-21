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

links = document.css('.categories ul li a')
result = links.map do |link|
  name, count = link.children
  [name.text.strip, count.text.to_i]
end
# Pregunta 1
print('---------PREGUNTA 1---------')
puts("\n")
p result
puts("\n")
print('---------PREGUNTA 2---------')
puts("\n")
  replies = document.xpath('//div[@class="replies"]/text()[string-length(normalize-space(.)) > 0]')
                .map { |node| node.to_s[/\d+/] }
  p replies
  puts("\n")
  views = document.xpath('//div[@class="views"]/text()[string-length(normalize-space(.)) > 0]')
                .map { |node| node.to_s[/\w+/] }
  p views
  puts("\n")
  links2 = document.css('.topics ul li div')
  topic = links2.map do |lk|
    name = lk.css('.name  p a').inner_text
      if name!=""
        [name]
      end
  end
  tema=topic.compact
  p tema

  puts("\n")
  year = document.xpath('//div[@class="name"]/text()[string-length(normalize-space(.)) > 0]')
              .map { |node| node.to_s[/\d{4}/] }

  p year

busqueda = "2022"
indice = 0;

year.each do |elemento|
    #print elemento, "\n"
    if elemento == busqueda
        #puts "El elemento #{busqueda} está en el índice #{indice}"
        t=(tema[indice])[0].to_s
        r=replies[indice]
        v=views[indice]
        y=year[indice]
        puts "tema: "+t
        puts "replies: "+r
        puts "vista: "+v
        puts "year: "+y
        puts "--------------"
    end
    indice = indice + 1
  end
  print('---------PREGUNTA 2---------')
  