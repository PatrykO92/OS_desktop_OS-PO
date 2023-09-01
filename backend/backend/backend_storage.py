import os
from storages.backends.dropbox import DropBoxStorage


class BackendStorage(DropBoxStorage):
    def _full_path(self, name):
        if name == "/":
            name = ""
        print("Root path in dropbox.storage : ", self.root_path)

        # If the machine is windows do not append the drive letter to file path
        if os.name == "nt":
            final_path = os.path.join(self.root_path, name).replace("\\", "/")

            # Separator on linux system
            sep = "//"
            base_path = self.root_path

            if (
                not os.path.normcase(final_path).startswith(
                    os.path.normcase(base_path + sep)
                )
                and os.path.normcase(final_path) != os.path.normcase(base_path)
                and os.path.dirname(os.path.normcase(base_path))
                != os.path.normcase(base_path)
            ):
                raise SuspiciousFileOperation(
                    "The joined path ({}) is located outside of the base path "
                    "component ({})".format(final_path, base_path)
                )

            print("Full file path in storage.dropbox._full_path : ", final_path)
            return final_path
        else:
            return safe_join(self.root_path, name).replace("\\", "/")
