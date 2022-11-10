from flask import Flask, render_template, Response, request, redirect, url_for
import psycopg2
import psycopg2.extras

app = Flask(__name__)

DB_HOST = "localhost"
DB_NAME = "app-b-shop"
DB_USER = "postgres"
DB_PASS = "56jo75eL"

conn = psycopg2.connect(dbname = DB_NAME, user = DB_USER, password = DB_PASS, host = DB_HOST)

@app.route('/')
def home():
    dataFile = readDB()
    return render_template('home.html', data = dataFile)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/calendario')
def calendario():
    return render_template('calendario.html')

def write(registro):
    saludo = ''
    try:
        saludo = open("src\\data\\archivo.txt", "a")
    except:
        saludo = open("src\\data\\archivo.txt", "w")
    finally:
        saludo.write(registro)
        saludo.write("\n")
        saludo.close()

def readDB():
    data = []
    try:
        cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        query = "select * from clientes"
        cur.execute(query)
        list_clientes = cur.fetchall()
        data = list_clientes
        print(list_clientes)
    except:
        data = []
    return data

def read():
    data = []
    try:
        archivo = open("src\\data\\archivo.txt")
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