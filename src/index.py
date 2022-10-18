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
    saludo = open("archivo.txt", "a")
    saludo.write(registro)
    saludo.write("\n")
    saludo.close()

def read():
    archivo = open("archivo.txt")
    data = []
    for linea in archivo:
        data.append(linea.split("#"))
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