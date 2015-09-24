#!/bin/bash
FILES=./*.kmz
for f in $FILES
do
  echo "Processing $f file..."
  # take action on each file. $f store current file name
  #cat $f
  unzip $f
  mv doc.kml "$f.kml"
done
