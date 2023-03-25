from flask import Flask
from flask import render_template, request
from flask import make_response

from almoststatic import FlaskAlmoststatic

app = Flask(__name__)
app.config['FAS_CONFIG'] = "./content/config.yaml"
app.config['SECRET_KEY'] = 'my_secret_flask_key'
app.jinja_env.auto_reload = True
app.config['TEMPLATES_AUTO_RELOAD'] = True

fas = FlaskAlmoststatic()
fas.init_app(app)


@app.route('/')
def index():
    return fas_pages("index")


@app.route('/<path:page>', methods=['GET', 'POST'])
def fas_pages(page):
    if not fas.cache:
        fas.load_config(app.config['FAS_CONFIG'])
    page_text = fas.build_page(page)
    if not page_text:
        return page_not_found(404)
    return make_response(page_text)


@app.errorhandler(404)
def page_not_found(error):
    return render_template('page404.html', page={}), 404


if __name__ == '__main__':
    app.run(port=5000)
