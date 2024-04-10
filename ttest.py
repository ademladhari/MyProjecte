class EditWindow(object):
    """
    Class to create and the edit the group window.
    """
    def __init__(self, *args):
        self.edit_width = 400
        self.edit_height = 400
        self.naming_width = 100
        self.naming_height = 50
        self.scrollList = None
        self.groups = []
        self.prefix = []
        self.suffix = []
        self.text_size = []
        self.new_group = None
        self.group_edit_window = cmds.window(w=self.edit_width, h=self.edit_height, t="Edit Groups")
        self.naming_window = None
        self.form = cmds.formLayout()
        self.tabs = cmds.tabLayout(innerMarginWidth=10, innerMarginHeight=5)
        cmds.formLayout(self.form, edit=True,
                        attachForm=((self.tabs, 'top', 0), (self.tabs, 'left', 0), (self.tabs, 'bottom', 0),
                                    (self.tabs, 'right', 0)))
        self.tab_interface()
        cmds.showWindow(self.group_edit_window)

    def tab_interface(self):
        # groups tab
        groups = cmds.rowColumnLayout(numberOfColumns=3)
        self.edit_interface(self.groups)
        cmds.setParent('..')
        # prefix tab
        prefix = cmds.rowColumnLayout(numberOfColumns=3)
        self.edit_interface(self.prefix)
        cmds.setParent('..')
        # suffix tab
        suffix = cmds.rowColumnLayout(numberOfColumns=3)
        self.edit_interface(self.suffix)
        cmds.setParent('..')
        # texture size tab
        text_size = cmds.rowColumnLayout(numberOfColumns=3)
        self.edit_interface(self.text_size)
        cmds.setParent('..')
        # add tabs to layout
        cmds.tabLayout(self.tabs, edit=True, tabLabel=((groups, 'Groups'), (prefix, 'Prefix'),
                                                       (suffix, 'Suffix'), (text_size, 'Texture Size')))

    def edit_interface(self, list_to_edit, *args):
        """
        Creates visual layout of the groups window.
        :param list_to_edit: list (e.g. groups, suffix, prefix) that is being listed and possible to edit
        :param args:
        :return:
        """
        cmds.button(l="+", h=20, w=20, c=partial(self.cmd_add, list_to_edit))
        cmds.button(l="Edit", h=20, w=30, c=self.cmd_edit)
        cmds.button(l="Delete", h=20, w=40, c=partial(self.cmd_delete, list_to_edit))
        self.scrollList = cmds.textScrollList(w=100, h=self.edit_height - 100,
                                              allowMultiSelection=True, append=list_to_edit)

    def cmd_edit(self, *args):
        selected_item = cmds.textScrollList(self.scrollList, q=True, selectItem=True)
        new_name = "New Name"
        if selected_item:
            cmds.textScrollList(self.scrollList, e=True, editItem=[selected_item[0], new_name])

    def cmd_delete(self, list_to_edit, *args):
        selected_items = cmds.textScrollList(self.scrollList, q=True, selectItem=True)
        if selected_items:
            cmds.textScrollList(self.scrollList, e=True, removeItem=selected_items)
            list_to_edit.remove(selected_items)

    def cmd_select(self, *args):
        name = cmds.textScrollList(self.scrollList, q=True, selectItem=True)
        index = cmds.textScrollList(self.scrollList, q=True, selectIndexedItem=True)
        print(name[0], index[0])
        return [name[0], index[0]]

    def cmd_add(self, list_to_edit, *args):
        """
        Method to create a new group.
        :param list_to_edit: 
        :param args:
        :return:
        """
        self.naming_window = cmds.window(w=self.naming_width, h=self.naming_height, t="Enter Name")
        cmds.showWindow(self.naming_window)
        col_layout = cmds.columnLayout(p=self.naming_window)
        row_layout = cmds.rowLayout(p=col_layout, nc=2)
        cmds.text(p=row_layout, l="Name: ")
        self.new_group = cmds.textField(p=row_layout, w=90, h=20)
        cmds.button(p=col_layout, l="Confirm", c=partial(self.cmd_confirm_adding, list_to_edit))

    def cmd_confirm_adding(self, list_to_edit, *args):
        """
        Belongs to create group.
        Appends the contents of text field to the group list and closes the naming window.
        :type list_to_edit: list to append
        :return:
        """
        if self.new_group is not None:
            self.new_group = cmds.textField(self.new_group, q=True, text=True)
            list_to_edit.append(self.new_group)
            cmds.textScrollList(self.scrollList, edit=True, append=list_to_edit)
            print(self.new_group, self.groups)
        else:
            pass
        cmds.deleteUI(self.naming_window)