require "nokogiri"
require 'open-uri'
require 'pp'
# download/cache the data (to speed up testing)
if !File.readable?("data.html")
  url = "https://www.bananatic.com/de/forum/games/"
  data = URI.open(url).read
  File.open("data.html", "wb") { |f| f << data }
end

data = File.read("data.html")
document = Nokogiri::HTML(data)
links = document.css(".categories ul li a")
result = links.map do |link|
  name, count = link.children
  [name.text.strip, count.text.to_i]
end
#Pregunta 1
print("---------PREGUNTA 1---------")
puts("\n")
p result
puts("\n")
print("---PREGUNTA 2 y 3 descomentar codigo---")
#-----------Para pregunta  2 y 3--------------------
#Pregunta 2, necesito extraer año de la fecha y dos etiquetas
#Pregunta 3, reutilizo lo dee extraer el año de la pregunta 2 pero ahora solo para 2020, segmento cada mes y hago conteo de numero de preguntas por mes.

#------------------
#Extraer las fechas de la  tabla, falta buscar sol las del 2022 y 2020, por ahora salen todas
links2 = document.css(".topics ul li div")
re = links2.map do |lk|
  #Con estas tres lineas comentadas extraigo las vistas y las respuestas. replies viw y
  replies = lk.css('.replies').inner_text
  views = lk.css('.views').inner_text
  [replies, views]
  
  # name = lk.css('.name').children.text.strip.split("\n")[2]
  
end
#p re me imprie las vistas y las respuestas eeen un array pero falta segmmentar solo las del 2022

#p re

#--------------------------------
links3 = document.css(".topics ul li div")
re = links3.map do |lk3|
  
  name = lk3.css('.name').children.text.strip.split("\n")[2]
end

#Aqui hago  extraccion de fechas
fecha = " "
size_fechas= re.length()
for i in(0..size_fechas)
    if(i != nil)
      fecha = re[i]   
      #print fecha      
    end
end

#-------------------------------------------

#Falta poner todo esto como funciones para poder reutilizar y segmentar haciendo uso de condicionales y estructuras de control.
                   

