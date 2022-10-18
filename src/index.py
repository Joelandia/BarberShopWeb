from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    dataFile = read()
    return render_template('home.html', data = dataFile)

@app.route('/about')
def about():
    write()
    return render_template('about.html')

def write():
    saludo = open("archivo.txt", "a")
    saludo.write("Agregue otra linea")
    saludo.write("\n")
    saludo.close()

def read():
    archivo = open("archivo.txt")
    data = []
    for linea in archivo:
        data.append(linea + "<br/>")
    return data

if __name__ == '__main__':
    app.run(debug=True)