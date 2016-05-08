(function() {
    var projectDetail = {
        boat: {
            desc: "This picture of a sailboat was taken from the northern end of the Golden Gate Bridge in San Francisco, CA",
            title: "Boat Project",
            image_med: "dist/images/boat-featured-600_medium.jpg",
            image_small: "dist/images/boat-featured-300_small.jpg",
            imageAlt: "Boat Image"
        },
        peacock: {
            desc: "This picture of a peacock was taken in Ardenwood farm in Fremont, CA",
            title: "Peacock Project",
            image_med: "dist/images/peacock-featured-600_medium.jpg",
            image_small: "dist/images/peacock-featured-300_smalljpg",
            imageAlt: "Peacock Image"
        },
        flower: {
            desc: "This picture of a rose was taken in the rosewood garden in San Jose, CA",
            title: "Flower Project",
            image_med: "dist/images/flowers-featured-600_medium.jpg",
            image_small: "dist/images/flowers-featured-300_small.jpg",
            imageAlt: "Flower Image"
        }
    };

    $('.featured').on('click', function(event) {
        var items = $(event.target);
        var projectName = items.closest('img').data('project-name');
        var projectObj = projectDetail[projectName];
        var html = '<div>' +
            '<img class="img-responsive" src="' + projectObj.image_med + '" ' +
            'srcset="' + projectObj.image_med + ' 600w, ' + projectObj.image_small + ' 300w" sizes="100vw" ' +
            'alt="' + projectObj.imageAlt + '">' +
            projectObj.desc + '</div>';

        BootstrapDialog.show({
            title: projectObj.title,
            message: html,
            buttons: [{
                label: 'Close',
                cssClass: 'btn btn-primary',
                action: function(dialogRef) {
                    dialogRef.close();
                }
            }]
        });
    });
}());
