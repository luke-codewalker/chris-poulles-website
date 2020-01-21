const { camelCase } = require("plop");

module.exports = function (plop) {
    plop.setGenerator('component', {
        description: 'Generate a new component',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Name of the component'
        },
        {
            type: 'confirm',
            name: 'addJS',
            message: 'Add a JS class?',
            default: false
        }
        ],
        actions: data => {
            const actions = [{
                type: 'add',
                path: 'src/components/{{dashCase name}}/{{dashCase name}}.hbs',
                templateFile: 'plop-templates/component.hbs.hbs'
            },
            {
                type: 'add',
                path: 'src/components/{{dashCase name}}/{{dashCase name}}.scss',
                templateFile: 'plop-templates/component.scss.hbs'
            }];

            if(data.addJS) {
                actions.push({
                    type: 'add',
                    path: 'src/components/{{dashCase name}}/{{dashCase name}}.js',
                    templateFile: 'plop-templates/component.js.hbs'
                })
            }

            return actions;
        }
    });
};