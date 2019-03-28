$(document).on("click", ".commentBtn", expandComments);
$(document).on("click", "#commentSubmit", submitComment);

function expandComments() {
    $("#commentTable").empty();
    let id = $(this).data("id");
    $.get("/api/notes/" + id, response => {
        $("#addComment").removeClass("d-none");
        localStorage.setItem("currentArticle", id);
        let notes = response[0].notes;
        console.log(notes)
        for (let i = 0; i < notes.length; i++) {
            let row = $("<tr>");
            let user = $("<th scope='row'>");
            let comment = $("<td>");
            user.append(notes[i].user);
            comment.append(notes[i].comment);
            row.append(user).append(comment);
            $("#commentTable").append(row)
        }
    })
}

function submitComment() {
    event.preventDefault();
    let id = localStorage.getItem("currentArticle");
    let comment = {};
    comment.user = $("#formUser").val();
    comment.comment = $("#formComment").val();
    $.post("/api/notes/" + id, comment, response => {
        console.log(response)
    })
}