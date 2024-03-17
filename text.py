class Directory:
    def __init__(self):
        self.name_directory = []

    def add_to_category(self, category, name, type):
        category_exists = False
        for entry in self.name_directory:
            if entry['category'] == category:
                entry['items'].append({'name': name, 'type': type})
                category_exists = True
                break
        if not category_exists:
            self.name_directory.append({'category': category, 'items': [{'name': name, 'type': type}]})

    def print_directory(self):
        for entry in self.name_directory:
            print(entry['category'])
            for item in entry['items']:
                print(f"\t{item['name']}: {item['type']}")

directory = Directory()
while True:
    category = input("Enter category (e.g., plants, cars, aliens): ")
    name = input("Enter item name: ")
    type = input("Enter item type: ")

    directory.add_to_category(category, name, type)

    print("Directory:")
    directory.print_directory()

    cont = input("Do you want to add more items? (yes/no): ")
    if cont.lower() != 'yes':
        break
