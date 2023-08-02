import mysql.connector
import os
import sys
import subprocess

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="midako1",
  database="conka"
)

check = True
if sys.argv[1] == "-f":
    dir_path = sys.argv[2]
    check = False
else:
    dir_path = sys.argv[1]

#dir_path=os.getcwd()
res = []
print(dir_path)
for file_path in os.listdir(dir_path):
    full_path = os.path.join(dir_path, file_path)
    if file_path[-4:] != ".avi" and file_path[-4:] != ".mp4" and file_path[-4:] != ".mkv":
        continue
    if os.path.isfile(full_path):
        print(file_path)
        if check:
            mycursor = mydb.cursor(buffered=True)
            mycursor.execute("select * from songs where datei=%s limit 1", (file_path,))
            if mycursor.rowcount > 0:
                mycursor.close()
                continue
            mycursor.close()
        args = "ffprobe -hide_banner '" + full_path + "'"
        output = subprocess.getoutput(args)
        index = output.index("Duration:")
        file_duration = output[index+10:index+20]
        print(file_path + " " + file_duration)
        res.append((dir_path, file_path, file_duration))
print(res)
mycursor = mydb.cursor(buffered=True)
sql = "INSERT INTO songs (pfad, datei, duration) VALUES (%s, %s, %s)"
#val = ("/media/Kara/songLists", "test.mp4", "00:01:50.00")
mycursor.executemany(sql, res)

mydb.commit()
print(mycursor.rowcount, "songs hinzugefügt.") 
mydb.close()
