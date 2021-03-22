# NotesWebsite
Notes Website allows users to create accounts and save notes with some text. Users can create, edit, and delete their notes.

# Motivation
It is not easy to keep track of things to do or information, so I created a Notes Website to allow users to save little pieces of information so that they can find it later.

# Languages/Tools Used
HTML, CSS, Javascript, PHP, MySQL

# Environment Setup
1. Download and Install Apache Web Server and MySQL Tools. Set up user account for MySQL.

2. Save PHP downloaded files in a folder located in same folder as Apache folder

3. Install httpd: httpd -k install

4. Rename php.ini-development to php.ini

5. Connect PHP to Apache by adding PHPIniDir, LoadModule, and AddHandler lines at the end of the Apache/conf/httpd file, *num* means version number, which may vary

PHPIniDir "php folder location"

LoadModule php*7*_module "php folder location/php*7*apache*2.4*.dll"

AddHandler application/x-httpd-php .php

6. Uncomment Servername variable in the httpd file

7. In php.ini file, uncomment extensions for pdo-mysql, ext, and any others needed

8. Change permissions in the directory tabs of the httpd file if needed

9. Add a <virtual host> tag to the httpd file in order to create a url to open the webpage, specify location of notes website folder

10. In <IfModule dir_module> tag, add the location of the folder with the noted website landing page

# How to open website
Start the Apache Web Server Service and MySQL Service, and type url specified in the httpd doc into the web browser. Make sure to fill in username and password details in the php files in order to allow pdo mysql connection to be successful.

# Limitations and Future Improvement
Currently, only local storage is used, so can only open website and see saved details on a single machine. Possible to expand to cloud storage.
Limited size of notes and only text can be saved. Security issues have not been considered yet. In the future, I may implement these improvements.

You may also setup the environment and work on improving the project!
