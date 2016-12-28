exports.home = (req, res)=>{
  res.render('index.html', {
    title: "Instagram Memory"
  })
};