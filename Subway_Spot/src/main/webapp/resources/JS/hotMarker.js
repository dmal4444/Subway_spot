
function getHotMarker(valuelat, valuelng){
	$.ajax({
          url: "./Hotplace.sub",
          data: {lat: valuelat, lng: valuelng},
          type: "get",
          dataType: "json",
          success: function(data) {


              var iw_content = document.getElementById("wrapper1");
              var iw_content2 = document.getElementById("firstCard2");
              var iw_content3 = document.getElementById("firstCard1");
              
      			var len = hotMarkerList.length;
      			for(i=0;i<len;i++){
      				hotMarkerList[i].setMap(null);
      			}
      			hotMarkerList = [];
              
              for(var i = 0; i < data.length; i++){
            	  
                 var marker = hotMarkerList.push(new google.maps.Marker({   
                  position: new google.maps.LatLng(data[i].xpoint, data[i].ypoint),
                  icon: data[i].category,
                  map: map,
                  clickable: true, draggable: false                 
                 }));

                 google.maps.event.addListener(hotMarkerList[hotMarkerList.length-1], "click", function(){
                    
                   //tab기능 실행
                   

                    //★★★★★ 
                    var temp = this;
                    var lat  = this.position.lat();
                    var lng  = this.position.lng();

                    
                    $.ajax({                          
                       url : "./Tabinfo.sub",
                       data : {lat : lat, lng : lng},
                       type : "post",
                       dataType : "json",
                       success : function(data){                          
                          //tab 펼침

                           
                           infowindow.setContent(iw_content);
                       
                             iw_content.style.display = "block";
                             iw_content2.style.display="none";
                             iw_content3.style.display="block";
                             
                             
                             
                             infowindow.open(map, temp); 
                             
                             var hotinfo = data;
                             var sethotinfo = document.getElementById('firstCard1');
                             $(".hotinfoimage").remove();   
                             
                             if(hotinfo[0].imagepath==''){
                            	 sethotinfo.innerHTML =
                                     "<div id = 'sethotinfo', class='sethotinfo'>" +
                                        "<tr>" +
                                        "<td height=155 width=300><b>"+hotinfo[0].station+"<br></b>" +
                                        "<p>"+hotinfo[0].name+"<br></p>" +
                                        "<p>"+hotinfo[0].ename+"<br></p>" +
                                        "<p>"+hotinfo[0].address+"<br></p>" +
                                        "<p>"+hotinfo[0].info+"</p>" +
                                        "</td>" +
                                        "<td height=135 width=300>" +
                                          "</td>" +
                                        "</tr>" +
                                          "</div>"      
                                         ; 
                             }
                             else{
                             sethotinfo.innerHTML =
                              "<div id = 'sethotinfo', class='sethotinfo'>" +
                                 "<tr>" +
                                 "<td height=155 width=300><b>"+hotinfo[0].station+"<br></b>" +
                                 "<p>"+hotinfo[0].name+"<br></p>" +
                                 "<p>"+hotinfo[0].ename+"<br></p>" +
                                 "<p>"+hotinfo[0].address+"<br></p>" +
                                 "<p>"+hotinfo[0].info+"</p>" +
                                 "</td>" +
                                 "<td height=135 width=300>" +
                                   "<img src='./images/hotplace/"+hotinfo[0].imagepath+"' style='width:130px;height:130px;'></td>" +
                                 "</tr>" +
                                   "</div>"      
                                  ;
                             }
                             
                             var hotinfoimage = document.getElementById('replyHotpl');
                             $(hotinfoimage).append(
                               "<div class='hotinfoimage'>" +
                                "<form method='POST' id='wfrm'>" +
                               "<input type='hidden' name='hotplacecode' id='hotplacecode' value='"+hotinfo[0].code+"'>" +
                               "<input type='hidden' name='xpoint' id='xpoint' value='"+hotinfo[0].xpoint+"'>" +
                               "<input type='hidden' name='ypoint' id='ypoint' value='"+hotinfo[0].ypoint+"'>" +
                                   "<tr>" +
                                   "<td><textarea name='body' id='body' cols=42 rows=6 style='resize : none;' placeholder='Reply this HotPlace'></textarea></td>" +
                                   "</tr>" +
                                   "<td>" +
                                   "<td><input type='text' id='nick' name='nick' placeholder='Enter Nickname'></td>" +
                                   "<td><input type='password' id='pw' name='pw' placeholder='Enter Password'></td>" +
                                   "<td><input type=button id='sBtn' value='Reply' padding=2></td>" +
                                   "<td><input type=button id='cBtn' value='Cancel' padding=2></td>" +
                                    "</tr>" +  
                                    "</form>" +                                 
                                    "<hr>" +
                                    "</div>" 
                                );
                             
                             
                       },
                       error : function(xhr, statusText, err){
                          console.log(statusText);
                          alert("FAIL!!");
                       }                           
                    });
                });                
             }
          },
          error: function(xhr, statusText, err) {
             console.log(statusText);
             alert("FAIL!!");
          }
       });
}

function markerVisible(){
	var len1 = rMarkerList.length;
	   for(i=0;i<len1;i++){
		   rMarkerList[i].setVisible(true);
	   }

	   
 var len2 = hMarkerList.length;
	   for(i=0;i<len2;i++){
		   hMarkerList[i].setVisible(true);
		  
	   }
}