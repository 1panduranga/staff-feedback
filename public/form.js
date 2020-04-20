const log=document.querySelector(".log");
const submit=document.querySelector(".submit")
let old=window.location.href;
const gems=document.querySelector("#gems")
const form=document.querySelector("#form")
let uid=localStorage.getItem('uid');
let pass=localStorage.getItem("pass")
submit.addEventListener('click',(e)=>{
    e.preventDefault();
    if(gems.value=="" || gems.value>25 || gems.value<1 || !Number.isInteger(Number(gems.value)))
    {
        alert('gems should be between 1 and 25')
        gems.focus();
    }
    else if(!(form.q1[0].checked || form.q1[1].checked || form.q1[2].checked || form.q1[3].checked))
    {
    alert('question 1 is left empty')
    }
    else if(!(form.q2[0].checked || form.q2[1].checked || form.q2[2].checked || form.q2[3].checked))
    {
    alert('question 2 is left empty')
    }
    else if(!(form.q3[0].checked || form.q3[1].checked || form.q3[2].checked || form.q3[3].checked))
    {
    alert('question 3 is left empty')
    }
    else if(!(form.q4[0].checked || form.q4[1].checked || form.q4[2].checked || form.q4[3].checked))
    {
    alert('question 4 is left empty')
    }
    else if(!(form.q5[0].checked || form.q5[1].checked || form.q5[2].checked || form.q5[3].checked))
    {
    alert('question 5 is left empty')
    }
    else if(!(form.q6[0].checked || form.q6[1].checked || form.q6[2].checked || form.q6[3].checked))
    {
    alert('question 6 is left empty')
    }
    else{
        
        let mg=0,g=0;
        
        db.collection('users').doc(uid).get().then((doc)=>{
                mg=Number(doc.data().gems)
                mg=mg-Number(gems.value)
                db.collection('users').doc(uid).update({
                    gems:mg
                })
                console.log(pass)
                db.collection('staff').doc(pass).get().then((doc)=>{
                    console.log(doc)
                    g=Number(doc.data().gems)
                    g+=Number(gems.value)
                   db.collection('staff').doc(pass).update({
                    q1:form.q1.value,
                    q2:form.q2.value,
                    q3:form.q3.value,
                    q4:form.q4.value,
                    q5:form.q1.value,
                    q4:form.q1.value,
                    gems:g
        
                })
                window.location.assign('../')
                })
                
                
            })
        
        
    
    
        localStorage.setItem(pass,1)
        alert('sucessfully submitted' )
        
    }
    
})







log.addEventListener("click",(e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        localStorage.clear();
        window.location.assign(old.replace('form','index'))
    });
    })

    