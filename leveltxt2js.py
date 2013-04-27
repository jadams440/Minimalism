import json

jsonOutput = []

filename = 'test'

f = open('assets/' + filename + '.txt', 'r')

fout = open('assets/' + filename + '.js', 'w')

fout.write('mn.testmap = {\n')

width = f.readline()
width = width[10:-1]
fout.write("tileswide: " + width + ",\n")

height = f.readline()
height = height[10:-1]
fout.write("tileshigh: " + height + ",\n")

tw = f.readline()
tw = tw[10:-1]
fout.write("tilewidth: " + tw + ",\n")

th = f.readline()
th = th[11:-1]
fout.write("tileheight: " + th + ",\n")

temp = f.readline() # Empty line
temp = f.readline() # Line we dont want

fout.write("tiles: [\n")

for i in range(int(height)-1):
    line = f.readline()
    line = '[' + line[:-2] + '],\n'
    fout.write(line)
line = f.readline()
line = '[' + line[:-2] + ']\n'
fout.write(line)

fout.write("]\n")
fout.write("};")

f.close()
fout.close()
