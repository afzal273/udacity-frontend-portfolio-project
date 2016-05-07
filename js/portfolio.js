/**
 * Created by asyed on 5/6/16.
 */

var projectDetail = {
    boat: {
        desc: "This picture was taken from the northern end of the Golden Gate Bridge in San Francisco, CA",
        title: "Boat Project",
        image: "dist/images/boat-featured-600_medium.jpg",
        imageAlt: "Boat Image"
    },
    peacock: {
        desc: "This picture was taken from the northern end of the Golden Gate Bridge in San Francisco, CA",
        title: "Peacock Project",
        image: "dist/images/peacock-featured-600_medium.jpg",
        imageAlt: "Peacock Image"
    },
    flower: {
        desc: "This picture was taken from the northern end of the Golden Gate Bridge in San Francisco, CA",
        title: "Flower Project",
        image: "dist/images/flowers-featured-600_medium.jpg",
        imageAlt: "Flower Image"
    }
};

$('.featured').on('click', function(event){

    var items = $(event.target);
    var projectName = items.closest('img').data('project-name');
    var projectObj = projectDetail[projectName];

    var html = '<div>' +
        '<img class="img-responsive" src="'+ projectObj.image +'" alt="' + projectObj.imageAlt +'">' +
        projectObj.desc + '</div>';

    BootstrapDialog.show({
        title: projectObj.title,
        message: html,
        buttons: [{
            label: 'Close',
            cssClass: 'btn btn-default',
            action: function(dialogRef) {
                dialogRef.close();
            }
        }]
    });
});