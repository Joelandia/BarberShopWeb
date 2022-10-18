from flask import Flask, render_template, Response, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    dataFile = read()
    return render_template('home.html', data = dataFile)

@app.route('/about')
def about():
    return render_template('about.html')

def write(registro):
    saludo = ''
    try:
        saludo = open("src/data/archivo.txt", "a")
    except:
        saludo = open("src/data/archivo.txt", "w")
    finally:
        saludo.write(registro)
        saludo.write("\n")
        saludo.close()

def read():
    data = []
    try:
        archivo = open("src/data/archivo.txt")
        for linea in archivo:
            data.append(linea.split("#"))
    except:
        data = []
    return data

@app.route("/forward/", methods=["POST"])
def move_forward():
    nombre = request.form['nombre']
    tipoTrabajo = request.form['tipoTrabajo']
    fechaRetoque = request.form['fechaRetoque']
    if(len(nombre)>1 and len(tipoTrabajo) > 1 and len(fechaRetoque) > 1):
        write(nombre + "#" + tipoTrabajo + "#" + fechaRetoque)
    return home()

if __name__ == '__main__':
    app.run(debug=True)