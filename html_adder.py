#!/usr/bin/env python3
# Takes txt file and adds <p> tags to every paragraph

import os
import re

basepath = './'

with os.scandir(basepath) as entries:
    for entry in entries:
        text = []
        name = entry.name
        if entry.is_file() and not entry.name.endswith('.py'):
            with open(entry, 'r', encoding='utf8', errors='ignore') as book:
                for line in book:
                    newLine = line.strip()
                    if newLine != '':
                        text.append('<p>' + newLine + '</p>')
                    else:
                        text.append(newLine)

            fileName = re.sub(r'(.(txt)|(html))$', '', entry.name)
            fileName = fileName.split('_')

            newFile = fileName[1].lower() + '-' + fileName[2].lower() + '-volume-' + fileName[0].lstrip('0') + '.html'

            content = '\n'.join(text)

            with open(newFile, 'a+', encoding='utf8') as book:
                book.write(content)
                    
            

