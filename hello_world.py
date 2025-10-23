# This script reads a file containing a single number and prints 'hello world' that number of times.

def main():
    file_path = 'input.txt'  # Update this path if your file is named differently
    try:
        with open(file_path, 'r') as f:
            content = f.read().strip()
            try:
                count = int(content)
                for _ in range(count):
                    print('hello world')
            except ValueError:
                print('The file does not contain a valid integer.')
    except FileNotFoundError:
        print(f'File {file_path} not found.')

if __name__ == '__main__':
    main()
