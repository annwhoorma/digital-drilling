import 'aframe';

AFRAME.registerComponent('bar', {
    schema: {
        color: {default: '#FFF'},
        size: {type: 'int', default: 5}
    }
});

AFRAME.registerComponent('mycomponent', {
    schema: { 
        yourData: {type: 'array'}
    },
  
    init: function () {
        console.log(this.data.yourData);
    }
});