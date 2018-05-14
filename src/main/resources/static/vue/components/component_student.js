//注册组件
Vue.component("student",{
    template:`
    <div>
      <div class="operatebar">
      学生名：<input type="text" v-model="student" v-on:keyup.enter="addStudent()" /><br>
      <input type="button" value="男" v-on:click="showStudent('M')"/>
      <input type="button" value="女" v-on:click="showStudent('F')"/>
      <input type="button" value="全" v-on:click="showStudent('A')"/>
      </div>
      <h1>学生列表</h1>
        <table class="table display" id="datatableContent">
            <thead>
                <tr>
                    <td>id</td>
                    <td>出生日期</td>
                    <td>报名日期</td>
                    <td>性别</td>
                    <td>姓名</td>
                    <td>状态</td>
                    <td>学号</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in showedData">
                    <td>{{item.id}}</td>
                    <td>{{item.birthday}}</td>
                    <td>{{item.enroll}}</td>
                    <td>{{item.gender}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.code}}</td>
                </tr>
            </tbody>
        </table>
      <!--<hr />-->
      <!--<ul>-->
        <!--<li v-for="item in showedData">-->
          <!--<div v-if = "item.editStatus">-->
            <!--<input type="text" v-model="item.name" v-on:blur="blurStudentEdit(item)" />-->
          <!--</div>-->
          <!--<div v-else>-->
            <!--<span v-bind:class="{red:item.gender=='F',blue:item.gender=='M'}" v-on:click="switchGender(item)">{{item.gender}}</span>-->
             <!-- -<span v-on:dblclick="editStudent(item)">{{item.name}}</span>-->
             <!-- -<input type="button" v-on:click="delStudent(item.id)" value="删除">-->
             <!-- -<input type="button" v-on:click="delStudent2(item)" value="删除(官方)">-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
      <div v-show="students.length == 0">
        <span>没有学生信息</span>
      </div>

    </div>
  `,
    data:function(){
        return {
            showType:"A",
            student:"",
            students:[]    //改成本地存储
            //students:localStorage.vstu ? JSON.parse(localStorage.vstu) : []
        }
    },
    methods:{
        showStudent:function(val){ //显示指定的类型
            console.log("val:" + val);
            this.showType = val;
        },
        addStudent:function(e){
            this.$http.post(
                "http://127.0.0.1:86/student",    //跨域
                // "/ctl/parent/add",
                //参数对象
                {
                    name: this.newParent.name,
                    relation : this.newParent.relation},
                {emulateJSON:true}
            ).then(function (resp){  // 请求成功回调
                this.allParents();
                //debugger;
            }, function () {
                // 请求失败回调
            });
            e.preventDefault(); //阻止事件传递
        },
        addStudent_local:function(){  //添加学生
            if(this.student == ""){
                alert("请输入学生姓名");
                return;
            }
            var student = {};
            student.id = Math.random() + (new Date()).getTime();  //id
            student.name = this.student;  //名称
            student.gender = "M";         //性别
            student.editStatus = false;   //是否编辑状态
            this.students.push(student);
            this.student = "";
            //保存到本地存储中
            //localStorage.vstu=JSON.stringify(this.students);
        },
        delStudent:function(id){  //删除学生
            // this.students = this.students.filter(function(obj){
            //     if(obj.id!=id){
            //         return obj;
            //     }
            // });
            // //保存到本地存储中
            // localStorage.vstu=JSON.stringify(this.students);
        },
        delStudent2:function(student){  //删除学生(官方)
            this.students.splice(this.students.indexOf(student),1);
            //保存到本地存储中
            //localStorage.vstu=JSON.stringify(this.students);
        },
        switchGender:function(student){ //修改性别
            if(student.gender == "M"){
                student.gender = "F";
            }else{
                student.gender = "M";
            }
            //保存到本地存储中
            //localStorage.vstu=JSON.stringify(this.students);
        },
        editStudent:function(student){  //编辑学生
            student.editStatus = true;
        },
        blurStudentEdit:function(student){  //完成编辑学生
            student.name = student.name;
            student.editStatus = false;
            //保存到本地存储中
            //localStorage.vstu=JSON.stringify(this.students);
        },
        allStudents:function(){
            this.$http.get("http://127.0.0.1:86/students")   //跨域,不能用这个
            // this.$http.get("/ctl/parent/all")   //使用get
                .then((data)=>{
                    this.students = JSON.parse(data.bodyText);
                });
        }
    },

    computed:{
        showedData:function(){  //显示指定的学生
            // return this.students;
            return this.students.filter((obj)=>{
                // return obj;
                if(this.showType == "A"){
                    return obj;
                }else{
                    if(obj.gender == this.showType){
                        return obj;
                    }
                }
            });
        }
    },

    created(){
        this.allStudents();
    },
});
