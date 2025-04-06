1. What is the project?

Inventory Application for a PC building store that the store owner can use to keep track of his shop’s products, their quantities and their details.

2.  You need to setup CRUD operations for the store data.

    i) Any user can Create, Read, and Update data but for deletion, a special password is required.

3.  What are the routes/pages that I’ll be setting up for the app?

    3.1. / – Just contains some basic info about the site and buttons to go to cars & category pages, may with the use of a nav-bar.

    3.2. /products – Shows all the items that the store has. Unfortunately, this can only display bare minimum details and the sorting capability if you choose to implement it, would be limited, probably only based on name, price, category, and brand I think. Have this route be accessiable via an item in the nav-bar (that can be expanded to see the categories – add it if you want to).

        3.2.1. How do I display all products across all categories though? Simple,
            • Just JOIN all the tables
            • Get & Display only the essential data for each item here, these should be good enough
                ◦ name
                ◦ price
                ◦ category
                ◦ brand
                ◦ quantity
            • Should clicking on the items, lead to its page?
                ◦ I don’t see why not, but configuring the back button in the dedicated page to lead to /products page or /products page/:category dynamically based on where the user came from would be difficult.
                ◦ Well, see if there’s a way for it to be done, if so implement it or you can literally just implement 2 buttons that lead to both.
                ◦ If dynamically? how would you do it? Try and recreate the function of the back button programmatically.
                    ▪ It’s actually just history.go(-1) or history.back().
                    ▪ Or just make two buttons and call it a day.

        3.2.2. In the /products page, make sure to set up some way to access the category page of each of the product categories, either through filters or some dedicated buttons.

        3.2.3. Sub-routes:
            • /:category – Dedicated Page for a category that shows the products of each category.
                ◦ Based on the category route chosen, render the appropriate .ejs file
                ◦ Or maybe keep the same skeleton for all categories but the thing is the filter options would change for each one though. Yeah I’m gonna have to get started first to decide exactly how I’ll handle it.
            • /products/new – Form page to add a new product.
            • /products/:productId – Dedicated page for each product with additional details.
                ◦ For this, you can either make each item contain it’s category in the route to reach the product page like given
                ◦ Or you can make it so that each product has a unique ID across all tables using something like UUID and make the dedicated product route like so: /products/:productId

            • /products/delete/:productId – refer to 5.
            • /products/edit/:productId -  This will create a page extremely similar looking to the product page.
                ◦  Except instead of the details, input fields containing the product details with appropriate labels will take their place.
                ◦ The user can then edit the product data and submit the changes.

    3.3. /builds – The store owner can create a PC build with the items that he has in his store, you’d have to figure out how to make the builds persist, probably create a table for it. Otherwise the default route will show all the created builds so far.

    Sub-routes:
    • /builds/new – The page that allows the user to create a new build. This will likely be a form that the user can access with a “Create new build” button.

    3.4. /search – Can search for any product and it will take you to the /products page with the filter applied. It’s kinda ez, just copy the same code form message-board project.

4.  Setup a basic express app in the MVC structure and create a postgres db and populate it with all the needed data.

    4.1. How do I populate the db?

        i) I think you should just populate it with tables using a script

        ii) Then set up forms to store data into them. It’s would be more convenient than to manually enter all the data.

    4.2. What’s the structure that a table for each category of items should have?

    There’s going to be 12 categories in total + Builds table: so 13 tables
    • CPUs
    • CPU Coolers
    • Motherboards
    • Memory
    • Storage
    • Video Card
    • Power Supplies
    • Cases
    • Monitors
    • Headphones
    • Keyboard
    • Mice
    • Builds

        4.2.0.5. These fields are common across all tables: (MAKE SURE TO ADD THEM).
            • id – Two options for you here,
                ◦ INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY - Finalized
                ◦ UUID DEFAULT uuid_generate_v4().
            • category – VARCHAR(20)
            • name – VARCHAR(100)
            • price – DECIMAL
            • brand – VARCHAR(40) (you can use this to sort too)
            • quantity – INTEGER
            • image – BYTEA

        ADD NOT NULL TO EVERY FIELD. Actually nvm, i can simply make the form inputs required

        So for those fields, that use some sort of unit along with a number like 50 mm, 1200 RPM, etc. Just get the numeric input from the form and store them. Then when you need to display them, retrieve the products from the db table, format them as required and send as json to frontend to display. This will allow you to use the same skeleton component for all products across categories.

        4.2.1. cpu
            • core_count – SMALLINT
            • core_clock – DECIMAL
            • boost_clock – DECIMAL
            • micro_architecture – VARCHAR(40)
            • tdp – SMALLINT
            • integrated_gpu – VARCHAR(40)

        4.2.2. cpu_cooler
            • fan_rpm – VARCHAR(15)
            • noise_level – VARCHAR(20)
            • color – VARCHAR(20)
            • radiator_size – VARCHAR(10)

        4.2.3. motherboard
            • socket – VARCHAR(10)
            • form_factor – VARCHAR(10)
            • memory_max – SMALLINT
            • memory_slots – SMALLINT
            • color – VARCHAR(20)

        4.2.4. memory
            • speed – VARCHAR(9)
            • modules – VARCHAR(10)
            • color – VARCHAR(20)
            • first_word_latency – SMALLINT
            • cas_latency – SMALLINT

        4.2.5. storage
            • capacity – SMALLINT
            • type – VARCHAR(10)
            • cache – SMALLINT
            • form_factor – VARCHAR(10)
            • interface – VARCHAR(25)

        4.2.6. video_card
            • chipset – VARCHAR(50)
            • memory – SMALLINT
            • core_clock – SMALLINT
            • boost_clock – SMALLINT
            • color – VARCHAR(20)
            • length – SMALLINT

        4.2.7. power_supply
            • type – VARCHAR(10)
            • efficiency_rating – VARCHAR(20)
            • wattage – SMALLINT
            • modular – VARCHAR(10)
            • color – VARCHAR(20)

        4.2.8. case
            • type – VARCHAR(25)
            • color – VARCHAR(20)
            • side_panel – VARCHAR(30)
            • external_volume – DECIMAL
            • hd_bays – SMALLINT

        4.2.9. monitor
            • screen_size – DECIMAL
            • resolution – VARCHAR(15)
            • refresh_rate – SMALLINT
            • response_time – DECIMAL
            • panel_type – VARCHAR(15)
            • aspect_ratio – VARCHAR(15)

        4.2.10. headphones
            • frequency_response – VARCHAR(20)
            • microphone – BOOLEAN
            • wireless – BOOLEAN
            • color – VARCHAR(20)

        4.2.11. keyboard
            • style – VARCHAR(20)
            • switch_type – VARCHAR(50)
            • backlit – VARCHAR(15)
            • tenkeyless – BOOLEAN
            • connection_type – VARCHAR(50)
            • color – VARCHAR(20)

        4.2.12. mouse
            • connection_type – VARCHAR(40)
            • max_dpi – INTEGER
            • hand_orientation – VARCHAR(10)
            • color – VARCHAR(20)

        4.2.13. builds
            • Keep all default fields from 4.2.0.5. except for count as it doesn’t make sense to have it for a pc build
            • Each of the above categories, 1 through 12 become fields for this table and you can just use the items’ names upon choosing one from their respective category for the build.

        4.2.14. BIG CHANGE:
            V• OKAY this sucks but I think I’m gonna create just one table for all products and store product-specific details in a datatype like JSONB, makes everything simple.
            • To display extra details in /:category page, just filter the main table by category and display only the ones that match and get product-specific details from the obj.
            • To display extra details in /:productId page, just get it with the id itself as having one table for everything would allow you to have a unique id for each product with auto-increment as well.

        4.2.15. Category table – for storing categories
            • id
            • name

    4.3. How do I enable image upload and store it into a postgres db?

        i) For each item category, have its form contain a image upload input and make sure the form has enctype “multipart/form-data”

        ii) You need the multer middleware library to handle the file upload, convert it to binary data and add it to req.file object.

        iii) Then using insert, store it into the image field

        iv) While retrieving the data, encode the image using base64 format and send it to the .ejs file

        v) In there, you can finally use the image in an img tag.

5.  What about deletion of products/categories?

    i) Obviously this is just for me, I can’t just let anyone delete anything so make it password protected.

    ii) Do I want both of them to be delete-able? Well setup the code for both and maybe try with a test sample but I can’t imagine actually deleting any categories.

    iii) How to perform the deletion? Let’s get specific:
    • Create an environment variable ADMIN_PASS that you can store the password in.
    • Store it in .env locally and after deploying you can store it in PAAS control panel’s environment
    • When the user clicks on the delete button of an item in its dedicated /:productId page, it will take the user to the /:productId/delete page
    • /:productId/delete – This page contains a single form that asks for the admin-password with 1 input, submit and back buttons. Submit submits the password, back takes the user back to the /:productId page.
    • Get the user input using req.body inside /delete controller.
    • Check if it equals the stored environment variable’s value.
    • If it does, perform the deletion and return the “Item deleted status”.
    • It it does not, send an error back to the user stating that the password is wrong.

6.  QUERIES

    What are the queries I need for the project?

        • To get individual product – SELECT * FROM products WHERE id=productId
        • To view all

7.  HOME page

    7.1. Header

        i) It will contain a nav-bar with,
            • Builder
            • Completed Builds
            • Products

        ii) Builder – will lead to the page in which the user can create a new build

        iii) Completed Builds – Will lead to the page where all completed builds are shown

        iv) Products – Will show all categories as options on hover which the user can click to go to the products page with the category filter applied.

    7.2. Dashboard

        i) Shows Products quantities, No. of Builds done, and total revenue from builds

    7.3. Content

        i) Contains big buttons for “View Builds”, “New Build” and “View Products”

8.  Steps moving forward:

    8.1. Get the insertion logic done – DONE

    8.2. Populate the DB with all store products – DONE
    • CPU – DONE
    • CPU Coolers – DONE
    • Motherboards – DONE
    • Memory – DONE
    • Storage – DONE
    • Video Card – DONE
    • Power Supplies – DONE
    • Cases – DONE
    • Monitors – DONE
    • Headphones – DONE
    • Keyboard – DONE
    • Mice – DONE

    8.3. Display all products in the products page – DONE

    8.4. Get the sorting logic done – DONE

    8.5. Implement the Search logic – DONE

    8.6. Create the dedicated page for the products – DONE

    8.7. Get the editing logic done for each of the products – DONE

        i) Each of the product category’s input for their details has to correspond with the input type that was used to add the product

        ii) Refer to the product-forms and just copy paste those same input fields for product-specific inputs

        iii) Then just style everything.

    8.8. Get the deletion logic done – DONE

    8.9. Create the builder.

        i) Decide whether you want it to be a single form or Have the user go to products page to choose parts for the build.

        ii) When the builder is clicked, a new build is created in the db.

        iii) Adding parts to the build will be done via UPDATE

        iv) There will be a cancel anchor tag with the href “/builds/builder/cancel”.

        v) If the user clicks on cancel, then the build gets deleted from the DB. Otherwise the build is saved including its progress so far.

        vi) The builder will show all categories in the page

        vii) Initially they will all be empty

        viii) Inside each, there will be an add part button that will take the user to the /builds/builder/:buildPart page. You'd sub in a category for the :buildPart in the <a> link for each part.

        ix) In the get controller for this route, you'd simply retrieve the buildPart param and send them into the ejs page that you'll render.

        x) Copy the general layout of the products.ejs page but remove the filters.

        xi) Apply only the category filter for that category whose add part button button was clicked on.

        xii) Add a "Add" button for all items under their details

        xiii) Do implement the individual item page viewing capability for the items but remove the page’s edit and delete buttons. Add the “Add” button instead.

        xiv) The button will send a post request to the “/builder/:buildPart” page.

        xv) In the post controller for this route, you'd retrieve the productId and buildPart (category).

        xvi) Using the productId, you'd get the product data from the table

        xvii) Then insert that data into the builder table or rather UPDATE the entry with the part

        xviii) Repeat this process for all parts.

        xix) Implement Session-based tracking of builder state to persist page data across routes

        xx) Configure builder page to display part data if the user has chosen a part and Normal tags otherwise

        xxi) Inside the post controller for the builder, check if the all the session.builder props have been populated, if even one of them is null, then render the builder form again with a warning saying “Please select all components to save build”.

        xxii) Inside choosePartPost create a products object containing props with the same prop names as in the builder, except each property will hold each category’s product chosen’s id, imageUrl, name, price

        xxiii) Refactor buildPrice into a prop of a larger object - buildDetails. Why? This would allow you to add in buildName and builderName into it as props in the Post controller of /builder without having to change it's definition in other controllers. Other definitions would only contain buildPrice prop in buildDetails and nothing else.

        xxiv) Inside builder.ejs, for each category you would check if the item exists in that category's item prop. - If it does, then you would display the div with the item's image, name and price. - If it does not, then you would display the "select category" div.

        xxv) Once you confirm new parts are in fact getting added to the form, try submitting the form without adding all components. This should re-render the form with an error and all other component selections have to show up – DONE SO FAR

        xxvi) I need to add a remove button for the selected component so the user can remove the selected component and change it if they want to, how?

            - Create a delete route & controller for the /builder/:buildPart route.
            - Inside the controller, get the buildPart param.
            - Iterate through the categories array and assign the item prop of the category whose name matches the buildPart to null.
            - This would remove that item and reset the div back to "select category" as the category.item would be null – DONE

        xxvii) Make sure to add the item prop to all the categories inside the Get controller of /builder but assign it as null. You want it to be null for all categories when you first render the /builder page – ALSO DONE

        xxviii) Do I need a change button for the categories? Nah, the user can simply remove the item to access the "select category" div again. It's unnecessary to add change but actually though, the implementation shouldn't be that hard. It'd just be an anchor tag with a get request to /builder/:buildPart. That will lead to the product selection page and from the there the select button would lead to the post controller where the req.session.builder[buildPart] value would get replaced with the new value. But don't you think it's a bit redundant to add both? I guess so but why not, you lazy? No I'm just thinking there's no need coz the remove button will enable that feature anyway. Yes but that's 2 steps compared to just one step of pressing change button and it'll cause page reload as well. You're right I'll add it anyway. – DONE

        xxxix) Once you're sure the form works as intended, ensure that the build is getting added to the builds table by checking manually in the terminal if you need to. – DONE

    8.10. Display the builds in the builds page – DONE

        8.10.5. Some Refactors

            i) Refactor builderName to buildFor everywhere.

            ii) Change chooseProductGet logic such that only the products with a quantity of at least 1 is shown in the selection page. Just update the SQL query to check for that condition and for quantity input in add-product and edit-product-page, make it's min value as 0. It can be zero but it can't go lower than that. By not suggesting products with a quantity less than 1, you're making sure that the quantity of a product doesn't become negative inside the SQL table.

    8.11. Create dedicated page for a build – DONE

    8.12. Create delete page for build – DONE

        i) copy the logic from delete product controller and just create the exact same functions needed but for a build

    8.13. Create Edit page for build – DONE

        i) you would use the buildId from req.params to get the build details.

        ii) Then you would populate the req.session.builder with the build details and parts and image as well I think (check that it's possible to store images in a session before doing so). Also add a special edit variable (set to true) to the session

        iii) Then simply redirect to /builds/builder which would automatically populate the builder with the details of the build being edited.

        iv) When an item of an existing build gets removed, do I increase its quantity back or do I not?

        v) Upon form submission, you would look for the edit variable in the session and if that's true, then you would use the buildId and/or buildName and/or buildFor to perform an update operation rather than an insert

9.  Dashboard

    What are all the stats that I wanna show for the store owner?

        i) No. of products in inventory

        ii) Total Revenue

        iii) No. of builds

10. MOBILE LAYOUT

    10.1. Homepage – DONE

    10.2. Products – DONE

        • products – DONE
        • product – DONE
        • add-product – DONE
        • choose-category – DONE
        • search-products – DONE
        • product-page – DONE
        • edit-product – DONE
        • delete-product – DONE

    10.3. Builds – DONEvv

        • builds – DONE
        • build – DONE
        • build-page – DONE
        • delete-build – DONE
        • choose-part – DONE
        • builder – DONE

11. TABLET LAYOUT

    11.1. iPad Mini

        11.1.1 Homepage – DONE

        11.1.2 Products – DONE

            • products – DONE
            • product – DONE
            • add-product – DONE
            • choose-category – DONE
            • search-products – DONE
            • product-page – DONE
            • edit-product – DONE
            • delete-product – DONE

        11.1.3 Builds – DONE

            • builds – DONE
            • build – DONE
            • build-page – DONE
            • delete-build – DONE
            • choose-part – DONE
            • builder – DONE

    11.2. iPad Air

        11.2.1 Homepage – DONE

        11.2.2 Products – DONE

            • products – DONE
            • product – DONE
            • add-product – DONE
            • choose-category – DONE
            • search-products – DONE
            • product-page – DONE
            • edit-product – DONE
            • delete-product – DONE

        11.2.3 Builds – DONE

            • builds – DONE
            • build – DONE
            • build-page – DONE
            • delete-build – DONE
            • choose-part – DONE
            • builder – DONE

    11.3. iPad Pro

        11.3.1 Homepage – DONE

        11.3.2 Products – DONE

            • products – DONE
            • product – DONE
            • add-product – DONE
            • choose-category – DONE
            • search-products – DONE
            • product-page – DONE
            • edit-product – DONE
            • delete-product – DONE

        11.3.3 Builds – DONE

            • builds – DONE
            • build – DONE
            • build-page – DONE
            • delete-build – DONE
            • choose-part – DONE
            • builder – DONE

12. Deploy on Render
