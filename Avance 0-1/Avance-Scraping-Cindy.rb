require 'nokogiri'
require 'open-uri'
require 'pp'
require 'csv'
require_relative 'Metodos.rb'

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
if File.exist?('dashboard/cindy/cindy_q1.csv')
  File.delete('dashboard/cindy/cindy_q1.csv')
end
result.each do |elemento|
  play = elemento[0]
  number = elemento[1]

  puts "Juego:  "+play
  puts "Preguntas: "+number.to_s
  puts "--------------"
  pregunta = Pregunta1_Cindy.new(play, number)
  pregunta.guardar
end
#p result
puts("\n")
print('---------PREGUNTA 2---------')

  replies = document.xpath('//div[@class="replies"]/text()[string-length(normalize-space(.)) > 0]')
                .map { |node| node.to_s[/\d+/] }
  #p replies
  puts("\n")
  views = document.xpath('//div[@class="views"]/text()[string-length(normalize-space(.)) > 0]')
                .map { |node| node.to_s[/\w+/] }
  #p views

  links2 = document.css('.topics ul li div')
  topic = links2.map do |lk|
    name = lk.css('.name  p a').inner_text
      if name!=""
        [name]
      end
  end
  tema=topic.compact
  #p tema

  puts("\n")
  year = document.xpath('//div[@class="name"]/text()[string-length(normalize-space(.)) > 0]')
              .map { |node| node.to_s[/\d{4}/] }

  #p year

busqueda = "2022"
indice = 0;
if File.exist?('dashboard/cindy/cindy_q2.csv')
  File.delete('dashboard/cindy/cindy_q2.csv')
end
year.each do |elemento|
    # if elemento == busqueda
        t=(tema[indice])[0].to_s
        r=replies[indice]
        v=views[indice]
        y=year[indice]
        if y  == '2022'
          puts "tema: "+t
          puts "replies: "+r
          puts "vista: "+v
          puts "year: "+y
          puts "--------------"
          pregunta = Pregunta2_Cindy.new(t, r, v, y)
          pregunta.guardar
        end
        
    # end
    indice = indice + 1
  end

  puts("\n")
print('---------PREGUNTA 3---------')
puts("\n")
if File.exist?('dashboard/cindy/cindy_q3.csv')
  File.delete('dashboard/cindy/cindy_q3.csv')
end
month = document.xpath('//div[@class="name"]/text()[string-length(normalize-space(.)) > 0]').map { 
  |node| node.to_s[/\d{2}.\d{2}.\d{4}/]
}
CSV.open('cindy_q3.csv', 'wb') do |csv|
  csv << ["Mes","Año"]
end
id=0;
array=[]
month.each do |x|
  mes= x[3]+x[4]
  year= x[6]+x[7]+x[8]+x[9]

  # puts year
  # pregunta = Pregunta3_Cindy.new(mes, year)
  # pregunta.guardar
   array[id]=[mes,year]
  id = id+1
end

  # nuevo
  #  puts array.length
  c=0
  for i in(0..(array.length-1))
      # puts ((array[i])[1])
      # puts "----"
      if ((array[i])[1])== '2022'
        
        pregunta = Pregunta3_Cindy.new((array[i])[0], (array[i])[1])
        pregunta.guardar
        puts "Año: " + (array[i])[0];
        puts "Mes: " + (array[i])[1];
        puts "--------------";
      end
  end



#  puts array.length
  # fin nuevo
