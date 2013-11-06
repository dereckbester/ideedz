<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>ideedz - index</title>

<!-- Header Meta - Stylesheets -->
<?php include('_partials/header-meta.php');?>
<!-- .END Header Meta - Stylesheets -->

</head>

<body>

<!-- Fixed Navigation bar with dropdown menu -->
<?php include('_partials/navigation-top-fixed.php');?>
<!-- .END - Fixed Navigation bar with dropdown menu -->

<!-- Grid -->

<div class="container">

	<div class="row">

    	<div class="col-md-12">
        	<h2>Contact</h2>
            <hr/>
            
            <!-- Contact Form -->
            <form class="form-horizontal">
            	
                <!-- Form - Name -->
                <div class="form-group">
                	<label for="name" class="col-sm-2 control-label">Name</label>
                    <div class="col-sm-6">
                   		<input type="text" class="form-control" name="name" placeholder="What is your name?" />
					</div>
                </div>
                <!-- .END - Form - Name -->
                
                <!-- Form - Email -->
                <div class="form-group">
                	<label for="email" class="col-sm-2 control-label">Email</label>
                    <div class="col-sm-6">
                   		<input type="email" class="form-control" name="email" placeholder="What is your email address?" />
					</div>
                </div>
                <!-- .END - Form - Email -->
                
                <!-- Form - Message -->
                <div class="form-group">
                	<label for="message" class="col-sm-2 control-label">Message</label>
                    <div class="col-sm-6">
                   		<textarea class="form-control" rows="3" placeholder="What can we help you with?"></textarea>
					</div>
                </div>
                <!-- .END - Form - Message -->
                
                <!-- Form - Checkboxes -->
                <div class="form-group">
                	<label for="website" class="col-sm-2 control-label">Favourite Websites</label>
                    <div class="col-sm-6">
                   		<label class="checkbox-inline">
                        	<input type="checkbox" value="option1"/> YouTube
                        </label>
                        
                        <label class="checkbox-inline">
                        	<input type="checkbox" value="option2"/> Twitter
                        </label>
                        
                        <label class="checkbox-inline">
                        	<input type="checkbox" value="option3"/> Facebook
                        </label>
                        
                        <label class="checkbox-inline">
                        	<input type="checkbox" value="option4"/> 9Gag
                        </label>
                        
                        <label class="checkbox-inline">
                        	<input type="checkbox" value="option5"/> Mashable
                        </label>
					</div>
                </div>
                <!-- .END - Form - Checkboxes -->
                
                <!-- Form - Radio Buttons -->
                <div class="form-group">
                	<label for="website" class="col-sm-2 control-label">Gender</label>
                    <div class="col-sm-6">
                   		<label class="radio-inline">
                        	<input type="radio" name="genderOption" value="option1"/> Male
                        </label>
                        
                        <label class="radio-inline">
                        	<input type="radio" name="genderOption" value="option2"/> Female
                        </label>
					</div>
                </div>
                <!-- .END - Form - Radio Buttons -->
                
                <!-- Form - Geographic Info -->
                <div class="form-group">
                	<label for="website" class="col-sm-2 control-label">City</label>
                    <div class="col-sm-6">
                   		<select class="form-control">
                        	<option>Cape Town</option>
                            <option>Durban</option>
                            <option>George</option>
                            <option>Johannesburg</option>
                            <option>Mosselbay</option>
                            <option>Port Elizabeth</option>
                        </select>
					</div>
                </div>
                <!-- .END - Form - Geographic Info -->
                
                <!-- Form - Submit Button -->
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-6">
                   		<button type="submit" class="btn btn-primary">Submit</button>
                        <button type="reset" class="btn btn-default">Clear</button>
					</div>
                </div>
                <!-- .END - Form - Submit Button -->
                
            </form>
            <!-- .END - Contact Form -->
        </div>

    </div>

</div>

<!-- .END Grid -->



<!-- Footer and Modal -->
<div class="container">
	<div class="row">
    	<div class="col-md-12">
        	
            <hr/>
            <!-- Copyright Info -->
            <?php include('_partials/footer-copyright.php');?>
            <!-- .END Copyright Info -->
            
            <!-- Modal -->
            <?php include('_partials/main-modal.php');?>
            <!-- .END Modal -->
        </div>
    </div>
</div>
<!-- .END Footer and Modal -->

<!-- Footer Meta - JavaScript -->
<?php include('_partials/footer-meta.php');?>
<!-- .END Footer Meta - JavaScript -->

</body>
</html>