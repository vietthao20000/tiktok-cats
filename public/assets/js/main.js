var msnry

var app = new Vue({
  el: '#main',
  data: {
    full: {},
    show_footer: false,
    active_page: 0,
    limit: 50,
  },
  mounted() {
    this.show_footer = false
    this.active_page = 1
  },
  methods: {
    increase_page() {
      if (this.active_page < this.max_page) this.active_page += 1
    },
    decrease_page() {
      if (this.active_page > 1) this.active_page -= 1
    }
  },
  computed: {
    current_max_page() {
      return this.max_page - this.active_page
    },
    max_page() {
      return Math.ceil(this.full.post_count / this.limit)
    },
    videos() {
      return this.full.aweme_list
    }
  },
  watch: {
    videos() {
      var msnry;

      this.$nextTick()
        .then(() => {
          gsdk.initVideoCards()
          var elem = document.querySelector('.grid');
          
          if (elem) {
            msnry = new Masonry(elem, {
              itemSelector: '.grid-item',
            });
          }
        })
        .then(this.$nextTick())
        .then(() => {
          for (var i=0; i<=5; i++) {
            setTimeout(() => {if (msnry) {msnry.layout()}}, 300*i)
          }

          this.show_footer = true
        })
    },
    active_page(val) {
      this.full = {}
      this.show_footer = false

      fetch(`http://localhost:1234/api/videos/cat?limit=${this.limit}&cursor=${(val-1)*this.limit}`)
        .then(r => r.json())
        .then(json => this.full = json)
    },
  }
})