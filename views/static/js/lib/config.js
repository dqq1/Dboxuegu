require.config({
	
	baseUrl:"/views/assets",
	paths:{
		"jquery":"jquery/jquery",
		"cookie":"jquery-cookie/jquery.cookie",
		"template":"artTemplate/template-web",
		"form":"jquery-form/jquery.form",
		"bootstrap": "bootstrap/js/bootstrap",
		"units":"../static/js/lib/units",
		"datepicker":"bootstrap-datepicker/js/bootstrap-datepicker",
		"datepickerCN":"bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
		"validate":"validate/jquery-validate",
		"nprogress":"nprogress/nprogress",
	},
	shim:{
		"bootstrap": {
            deps: ["jquery"]
        },
		"datepickerCN":{
        	deps:["jquery"]
		},
		"validate":{
			deps:["jquery"]
		},
	},
})