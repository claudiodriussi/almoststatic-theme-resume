"""After you've developed you site, you can write the static file with a little
script.

If you want to publish in localhost, you can give the STATIC_URL variable as
argument, don't forget to add the trailing slash.
"""
import sys
import almoststatic

a = almoststatic.Almoststatic()
a.load_config()

STATIC_URL = '/'
MEDIA_PREFIX = 'media'
DESTINATION = './_static_site'

if len(sys.argv) > 1:
    STATIC_URL = sys.argv[1]
    print(STATIC_URL)

a.write_static(destination=DESTINATION,
               media_prefix=MEDIA_PREFIX,
               static_url=STATIC_URL)

a.write_json_meta(destination=DESTINATION)
