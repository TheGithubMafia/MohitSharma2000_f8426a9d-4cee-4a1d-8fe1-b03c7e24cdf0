file_path = input("Enter the tsv file path : ")
tsv_file = open(file_path, 'r')
tsv_content = tsv_file.read()
csv_content = tsv_content.replace("\t", ",")
file_name = input("Enter the file name with extension name .csv : ")
csv_file = open(file_name, 'w')
csv_file.write(csv_content)
csv_file.close()
print("Task Completed, TSV Converted to CSV") 