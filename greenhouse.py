from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():

    return render_template('greenhouse_main.html')
@app.route('/cctv')
def cctv():
   
    return render_template('greenhouse_cctv.html')

@app.route('/data')
def data():
    return render_template('greenhouse_data.html')

@app.route('/control')
def control():
    return render_template('greenhouse_control.html')




if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port='5000')
