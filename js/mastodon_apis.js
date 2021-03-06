function newlogin(domain) {
  var url = uri + "/login.html";
  fetch("https://" + domain + "/api/v1/apps", {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      scopes: 'read write',
      client_name: 'Drawdon',
      redirect_uris: url,
      website: 'https://github.com/yuzulabo/Drawdon'
    })
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error();
    }
  }).then(function (json) {
    var inst_domain_tmp = domain.toLowerCase();
    localStorage.setItem('drawdon_domain', inst_domain_tmp);
    localStorage.setItem('drawdon_cid', json["client_id"]);
    localStorage.setItem('drawdon_scr', json["client_secret"]);
    location.href = 'https://' + inst_domain_tmp + '/oauth/authorize?response_type=code&redirect_uri=' + url + '&scope=read+write&client_id=' + json["client_id"];
  }).catch(function (error) {
    console.log(error);
    show_error("newlogin: " + error);
  });
}