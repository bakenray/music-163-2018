{
    let view ={
        el:".page > main",
        init(){
            this.$el =$(this.el)
        },
        template:`
        <div class="bg-bar" id="fromBar">

            <form class="form">        
                <div class="row">
                    <label>歌曲名</label>
                    <input type="text" name="name" value="__name__" autocomplete="off">
                </div>
                <div class="row">
                    <label>歌手名</label>
                    <input type="text" name="singer" value="__singer__" autocomplete="off">
                </div>
                <div class="row">
                    <label>外链接</label>
                    <input type="text" name="url" value="__url__" autocomplete="off">
                </div>
                <div class="row actions">
                        <button type="submit">保存</button>
                </div>
            </form>
        </div>
        `,
        render(data = {}){
            let placeholders = ['name','url','singer','id']
            let html = this.template
            placeholders.map((string)=>{
                html = html.replace(`__${string}__`,data[string] || '')
            })
            $(this.el).html(html)
            let fromBar = $('.page > main > #fromBar')
            if(data.id){
                $(fromBar).prepend('<h2>编辑歌曲<h2/>')
            }
            else{
                $(fromBar).prepend('<h2>新建歌曲<h2/>')
            }
        },
        reset(){
            this.render({})
        }
    }
    let model ={
        data:{
            name:'',
            singer:'',
            url:'',
            id:''
        },
        create(data){
            var Song =AV.Object.extend('Song')
            var song = new Song()
            song.set('name',data.name)
            song.set('singer',data.singer)
            song.set('url',data.url)
            return song.save().then((newSong)=>{
                // let id =newSong.id
                // let attributes = newSong.attributes //等同于下面一样
                let {id,attributes} =newSong
                // this.data.id =id
                // this.data.name = attributes.name
                // this.data.singer = attributes.singer
                // this.data.url = attributes.url //等同于下面一样

                // this.data = {id,...attributes}
                Object.assign(this.data,{id,...attributes})
            },(error)=>{
                console.log(error)
            })
        }
    }
    let controller ={
        init(view,model){
            this.view =view
            this.view.init()
            this.model =model
            this.view.render(this.model.data)
            this.bindEvents()

            // window.eventHub.on('upload',(data)=>{
            //     this.model.data =data
            //     this.view.render(this.model.data)
            // })

            window.eventHub.on('select',(data)=>{
                this.model.data =data
                this.view.render(this.model.data)
            })
            window.eventHub.on('new',(data)=>{

                if(this.model.data.id){
                    this.model.data={name:'',url:'',id:'',singer:''}
                }
                else{
                    Object.assign(this.model.data,data)
                }
                this.view.render(this.model.data)
            })
        },
        bindEvents(){
            this.view.$el.on('submit','form',(e)=>{
                e.preventDefault()
                let needs = 'name singer url'.split(' ')
                let data ={}
                needs.map((string)=>{
                    data[string] = this.view.$el.find(`[name="${string}"]`).val()
                })
                this.model.create(data)
                .then(()=>{
                    this.view.reset()
                    let string = JSON.stringify(this.model.data)
                    let object = JSON.parse(string)
                    window.eventHub.emit('create',object)
                })
            })
        }
    }
    controller.init(view,model)
}