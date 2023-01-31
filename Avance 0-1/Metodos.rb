class Metodos
    def initialize()
    end
    def imprimeme()
      return "Hola"
    end

  end

  class Pregunta1_Cindy
    attr_accessor :juego, :numero
  
    def initialize(juego, numero)
      @juego = juego
      @numero = numero
    end
    # dashboard/cindy/
    def guardar
      CSV.open('dashboard/cindy/cindy_q1.csv', 'a') do |csv|
        csv << [juego, numero.to_s]
      end
    end
  end

  class Pregunta2_Cindy
    attr_accessor :tema, :respuesta, :vista, :year
  
    def initialize(tema, respuesta, vista, year)
      @tema = tema
      @respuesta = respuesta
      @vista = vista
      @year = year
    end
  
    def guardar
      CSV.open('dashboard/cindy/cindy_q2.csv', 'ab') do |csv|
        csv << [tema, respuesta, vista, year]
      end
    end
  end
  
  class Pregunta3_Cindy
    attr_accessor :month, :year
  
    def initialize(month,year)
      @month = month
      @year = year
    end
  
    def guardar
      CSV.open('dashboard/cindy/cindy_q3.csv', 'ab') do |csv|
        csv << [month, year]
      end
    end
  end
  #  #  #  #  #  #  #  #  #  #  #  #  #  #  # 
  