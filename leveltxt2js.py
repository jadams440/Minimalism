import json
import os

cwd = os.getcwd()
path = os.path.join(cwd, "maps")

filename = 'maps.js'
jsOutput = []

fout = open('maps/' + filename, 'w')

fout.write('mn.maps = [\n\n')

first = 1

for file in os.listdir(path):
    if file.endswith(".txt"):
        print file        
        f = open('maps/' + file, 'r')
        if first == 1:
            fout.write('{\n')
            first = 0
        else:
            fout.write(',\n\n{\n')
        
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

        fout.write("],\n")

        temp = f.readline() # Empty line
        temp = f.readline() # Line we dont want

        # Exits
        for y in range(int(height) - 1):
            line = f.readline()
            line = line [:-2]
            line = line.split(',')
            if '0' in line:
                y0 = y
                x0 = line.index('0')
            if '1' in line:
                y1 = y
                x1 = line.index('1')
            if '2' in line:
                y2 = y
                x2 = line.index('2')

        fout.write('exit0: [' + str(x0) + ', ' + str(y0) + '],\n')
        fout.write('exit1: [' + str(x1) + ', ' + str(y1) + '],\n')
        fout.write('exit2: [' + str(x2) + ', ' + str(y2) + '],\n')


        temp = f.readline() # Empty line
        temp = f.readline() # Line we dont want

        # Spawns
        for y in range(int(height) - 1):
            line = f.readline()
            line = line [:-2]
            line = line.split(',')
            if '0' in line:
                y0 = y
                x0 = line.index('0')
            if '1' in line:
                y1 = y
                x1 = line.index('1')
            if '2' in line:
                y2 = y
                x2 = line.index('2')

        fout.write('spawn0: [' + str(x0) + ', ' + str(y0) + '],\n')
        fout.write('spawn1: [' + str(x1) + ', ' + str(y1) + '],\n')
        fout.write('spawn2: [' + str(x2) + ', ' + str(y2) + ']\n')
        
        fout.write("}")

fout.write('\n\n];')

f.close()
fout.close()
