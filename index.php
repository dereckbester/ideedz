<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>ideedz - Welcome to our website</title>

<!-- Header Meta - Stylesheets -->
<?php include('_partials/header-meta.php');?>
<!-- .END Header Meta - Stylesheets -->

</head>

<body id="home">

<!-- Fixed Navigation bar with dropdown menu -->
<?php include('_partials/navigation-top-fixed.php')?>
<!-- .END - Fixed Navigation bar with dropdown menu -->

<!-- Carousel - Slider -->
<?php include('_partials/carousel.php')?>
<!-- .END Carousel - Slider -->

<!-- Grid -->

<section class="container">

	<div class="content row"><!-- row -->
    
    	<section class="main col-md-8">
        	<!-- intro article --><?php include('_includes/article-intro.php');?><!-- .END - intro article -->
            <!-- about the artists --><?php include('_includes/article-about-the-artists.php');?><!-- .END - about the artists -->
            <!-- about the venue --><?php include('_includes/article-about-the-venue.php');?><!-- .END - about the venue -->
        </section>
        
        <section class="sidebar col-md-4">
        	<!-- Sidebar Register --><?php include('_includes/aside-register.php');?><!-- .END - Sidebar Register -->
            <!-- Portfolio --><?php include('_includes/aside-portfolio.php');?><!-- .END - Portfolio -->
            <!-- // --><?php include('_includes/aside-events.php');?><!-- .END - // -->
        </section>

    </div><!-- end row -->
        
</section>

<!-- .END Grid -->

<!-- Font Awesome Icons -->
<?php include('_partials/font-awesome.php');?>
<!-- .END Font Awesome Icons -->

<!-- Footer and Modal -->
<section class="container">
	<div class="content row">
    	<section class="col-md-12">
        	
            <hr/>
            <!-- Copyright Info -->
            <?php include('_partials/footer-copyright.php');?>
            <!-- .END Copyright Info -->
            
            <!-- Main Modal -->
            <?php include('_partials/main-modal.php');?>
            <!-- .END Main Modal -->
            
            <!-- Photos Modal -->
            <?php include('_partials/photos-modal.php');?>
            <!-- .END Photos Modal -->
        </section>
    </div>
</section>
<!-- .END Footer and Modal -->

<!-- Footer Meta - JavaScript -->
<?php include('_partials/footer-meta.php');?>
<!-- .END Footer Meta - JavaScript -->

</body>
</html>