<script>
    //var url = window.document.URL;
        var url =   window.document.URL;
        acToken =   gup(url, 'access_token');
        tokenType = gup(url, 'token_type');
        expiresIn = gup(url, 'expires_in');

    function gup(url, name) {
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\#&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        if( results == null )
            return "";
        else
            return results[1];
    }

    location.href = 'http://localhost:9000?access_token='+acToken+'&token_type='+tokenType+'&expires_in'+expiresIn;

</script>
