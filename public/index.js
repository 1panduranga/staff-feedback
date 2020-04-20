const change=document.querySelector(".change-option");
const chage_content=document.querySelector(".change-option p");
const login=document.querySelector(".login");
const signup=document.querySelector(".signup");
let c=0;
let old=window.location.href;
const login_form=document.querySelector("#login-form");
const signup_form=document.querySelector("#signup-form");
const b_login=document.querySelector(".b_login");
const b_signup=document.querySelector(".b_signup");
const logout=document.querySelector(".logout");
const modal_login=document.querySelector("#modal-login");
const inside = document.querySelectorAll(".in");
const outside = document.querySelectorAll(".out");
const list_wrapper=document.querySelector(".list_wrapper");
const my_name=document.querySelector('.my_name')
let uid=0;
let name;
const my_gems=document.querySelector(".my_gems")
auth.onAuthStateChanged(user=>{
    if(user)
    {
        if(user['displayName']==null)
    {
      user.updateProfile({
          displayName:name
      })
      name=user['displayName'];
    }
    else{
        name=user['displayName'];

    }
    my_name.innerHTML=name
        uid=user['uid'];
        localStorage.setItem('uid',uid)
        inside.forEach((i)=>{
            i.classList.remove("block");
        })
        outside.forEach((o)=>{
            o.classList.add("block");
        })
        db.collection('staff').orderBy('gems',"desc").onSnapshot(snapshot=>
            {
               let changes=snapshot.docChanges();
               changes.forEach(change => {
                   if(change.type=="added")
                   {
                     let li=document.createElement('li')
                     let name=document.createElement('h5')
                     name.setAttribute('class','name')
                     let subject=document.createElement('span')
                     subject.setAttribute('class','subject')
                     let gems=document.createElement('span')
                     name.textContent=change.doc.data().name
                     subject.textContent=change.doc.data().subject
                     gems.textContent=`${change.doc.data().gems} Gems`
                     
                     li.setAttribute("data-id",change.doc.id)
                     name.setAttribute("data-id",change.doc.id)
                     gems.setAttribute("data-id",change.doc.id)
                     subject.setAttribute("data-id",change.doc.id)
                     gems.classList.add("class","gems")
                     li.appendChild(name)
                     li.appendChild(subject)
                     li.appendChild(gems)
                     li.classList.add("emo")
                     li.addEventListener("click",(e)=>{
                         if(localStorage.getItem(e.target.getAttribute('data-id'))==null)
                         {
                            localStorage.setItem("pass",e.target.getAttribute('data-id'))
                             window.location.assign('form.html')
                         }
                         else{
                             alert("Relax, you've already submitted this")
                         }
                         
                     })
                     list_wrapper.appendChild(li)


                   }  
                   
                    });
              
            });
            db.collection('users').doc(uid).get().then(doc=>{
                
                 my_gems.textContent=doc.data().gems
            })
                
                
            

    }
    else{
        list_wrapper.innerHTML=''
        uid=0;
        localStorage.setItem("uid",uid)
        inside.forEach((i)=>{
            i.classList.add("block");
        })
        outside.forEach((o)=>{
            o.classList.remove("block");
        })
    }
})


















document.addEventListener("DOMContentLoaded",()=>{
    const modals=document.querySelectorAll(".modal");
    modals.forEach(modal=>{
      $(modal).modal({});
    })})



    change.addEventListener("click",()=>{
        login.classList.toggle("block");
        signup.classList.toggle("block");
        c++;
        if(c%2!=0)
        {
            chage_content.innerHTML=`Already had an account? <span class="red-text chngbtn text-lighten-1"> login</span>`;
        }
        else{
            chage_content.innerHTML=`Not registered?<span class="red-text chngbtn text-lighten-1"> SignUp</span>`;
        }
    })

    login_form.addEventListener("submit",(e)=>{
        e.preventDefault();
        b_login.classList.add("disabled");
        let email=login_form['login-email'].value;
        let password=login_form['login-password'].value;
        auth.signInWithEmailAndPassword(email,password).then((cred)=>{
            M.Modal.getInstance(modal_login).close();
            login_form.reset();
            b_login.classList.remove("disabled");
            
        }).catch(err=>{
            let lerrmsg=document.querySelector(".lerrmsg");
            lerrmsg.setAttribute("style","display:block;")
            b_login.classList.remove("disabled")
            lerrmsg.innerHTML=`<p class="red-text center">${err['message']}</p>`;
            setTimeout(()=>{
                lerrmsg.setAttribute("style","display:none;")
            },3000)
        })
       
    
    });
    
    
    signup_form.addEventListener("submit",(e)=>{
    e.preventDefault();
    b_signup.classList.add("disabled");
    let email=signup_form['signup-email'].value;
    let password=signup_form['signup-password'].value;
    auth.createUserWithEmailAndPassword(email,password).then(cred=>{
        name=signup_form['signup-name'].value;
        M.Modal.getInstance(modal_login).close();
        signup_form.reset();
        db.collection('users').doc(cred['user']['uid']).set({
          gems:100
          })

        b_signup.classList.remove("disabled");
    }).catch(err=>{
        let serrmsg=document.querySelector(".serrmsg");
        serrmsg.setAttribute("style","display:block;")
        b_signup.classList.remove("disabled");
        serrmsg.innerHTML=`<p class="red-text center">${err['message']}</p>`;
        setTimeout(()=>{
            serrmsg.setAttribute("style","display:none;")
        },3000)
    });
    })
    
    
    logout.addEventListener("click",(e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        localStorage.clear();
    });
    })

    