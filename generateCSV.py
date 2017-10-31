import csv
import random

studs = ['Divino', 'Higor', 'Ruy', 'Leogal', 'Pedro', 'Lucas']
ranges = [[1, 2, 2, 5, 6, 8.5, 8, 8.7, 9, 10, 10, 10],
          [3, 3, 4, 8, 9, 2, 4.5, 4.4, 4.3, 7, 8, 5],
          [10, 10, 9, 6, 3, 4, 5, 8, 9.5, 8, 7, 7.2],
          [7, 7, 7.8, 8, 9, 10, 7, 5, 3, 2, 0, 0],
          [4, 5, 5.5, 7, 7.5, 6, 6.2, 5.2, 4.5, 4, 6, 7],
          [10, 9, 8, 9, 6.5, 5, 5, 4.3, 2, 5, 5.5, 9]];

with open('data/grades.csv', 'w') as csvfile:
    writer = csv.writer(csvfile);

    writer.writerow(['Name', 'Month', 'Grade']);
    for i in range(6):
        for j in range(12):
            writer.writerow([studs[i], str(j), str(ranges[i][j])])
