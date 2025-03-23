
export default class imageModel{
    constructor(id,desc,imageUrl){
        this._id=id;
        this.desc=desc;
        this.imageUrl=imageUrl;
       
    }
    static add(image){
    image.id=images.length+1;
    image.push(image);
    return image;
    }
    static get(id){
        const image=images.find((i)=>i.id==id);
        return image;
    }
    static GetAll(){
       return images; 
    }
}
var images=[
    new imageModel(
        1,
        'Description for product 1',
        'file:///C:/Users/HP/Downloads/pexels-mikebirdy-112460.jpg'
    ),
    new imageModel(
        2,
        'description for product 2',
        'file:///C:/Users/HP/Downloads/2.jpg'
    ),
    new imageModel(
        3,
     'description for prodect 3',
     'file:///C:/Users/HP/Downloads/3.avif'
    )
];

