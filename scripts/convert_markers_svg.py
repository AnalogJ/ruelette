from os import listdir
from os.path import isfile, join
from subprocess import call
import os
onlyfiles = [f for f in listdir('../src/assets/img/markers/svg') if isfile(join('../src/assets/img/markers/svg', f))]

if not os.path.exists("../src/assets/img/markers/black"):
    os.makedirs("../src/assets/img/markers/black")

for file in onlyfiles:
    print "converting {0}".format(file)

    call(["rsvg-convert", "../src/assets/img/markers/svg/{0}".format(file),"-a","-h","50","-d","150","-p","150", "-o", "../src/assets/img/markers/black/{0}".format(os.path.splitext(file)[0] + '.png')])
