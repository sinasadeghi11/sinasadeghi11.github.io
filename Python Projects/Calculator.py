import tkinter as tk

class Calculator:
    def __init__(self, master):
        self.master = master
        self.master.title("Calculator")

        self.result = tk.StringVar()

        self.entry = tk.Entry(self.master, textvariable=self.result)
        self.entry.grid(row=0, column=0, columnspan=4, padx=10, pady=10, ipadx=10, ipady=10)

        self.create_buttons()

    def create_buttons(self):
        button_list = [
            ('7', lambda: self.update_result('7')),
            ('8', lambda: self.update_result('8')),
            ('9', lambda: self.update_result('9')),
            ('/', lambda: self.update_result('/', False)),
            ('4', lambda: self.update_result('4')),
            ('5', lambda: self.update_result('5')),
            ('6', lambda: self.update_result('6')),
            ('*', lambda: self.update_result('*', False)),
            ('1', lambda: self.update_result('1')),
            ('2', lambda: self.update_result('2')),
            ('3', lambda: self.update_result('3')),
            ('-', lambda: self.update_result('-', False)),
            ('0', lambda: self.update_result('0')),
            ('.', lambda: self.update_result('.')),
            ('=', lambda: self.update_result('=', False)),
            ('+', lambda: self.update_result('+', False))
        ]

        row = 1
        col = 0
        for label, command in button_list:
            tk.Button(self.master, text=label, width=5, height=2, command=command).grid(row=row, column=col)
            col += 1
            if col > 3:
                col = 0
                row += 1

    def update_result(self, value, append=True):
        if value == '=':
            try:
                self.result.set(eval(self.entry.get()))
            except:
                self.result.set("Error")
        elif append:
            current = self.entry.get()
            self.result.set(current + value)
        else:
            current = self.entry.get()
            self.result.set(current + ' ' + value + ' ')

if __name__ == '__main__':
    root = tk.Tk()
    calculator = Calculator(root)
    root.mainloop()
