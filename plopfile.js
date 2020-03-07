module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Generate a new component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Name of the component',
    },
    {
      type: 'confirm',
      name: 'addJS',
      message: 'Add a JS class?',
      default: false,
    },
    ],
    actions: (data) => {
      const actions = [{
        type: 'add',
        path: 'src/components/{{dashCase name}}/{{dashCase name}}.hbs',
        templateFile: 'plop-templates/component.hbs.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{dashCase name}}/{{dashCase name}}.scss',
        templateFile: 'plop-templates/component.scss.hbs',
      },
      {
        type: 'modify',
        path: 'src/index.scss',
        pattern: /(@import .*\.scss";)/s,
        template: '$1\r\n@import "./components/{{dashCase name}}/{{dashCase name}}.scss";',
      }];

      if (data.addJS) {
        actions.push(
          {
            type: 'add',
            path: 'src/components/{{dashCase name}}/{{dashCase name}}.js',
            templateFile: 'plop-templates/component.js.hbs',
          },
          {
            type: 'modify',
            path: 'src/index.js',
            pattern: /(import .*";)/s,
            template: '$1\r\nimport { {{properCase name}} } from "./components/{{dashCase name}}/{{dashCase name}}.js";',
          },
          {
            type: 'modify',
            path: 'src/index.js',
            pattern: /(setupComponents\(\[(\{.*\})*)\]/s,
            templateFile: 'plop-templates/js.snippet.hbs',
          },
        );
      }

      return actions;
    },
  });

  plop.setGenerator('component class', {
    description: 'Generate a new class for a existing component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Name of the component',
    },
    ],
    actions: [{
      type: 'add',
      path: 'src/components/{{dashCase name}}/{{dashCase name}}.js',
      templateFile: 'plop-templates/component.js.hbs',
    },
    {
      type: 'modify',
      path: 'src/index.js',
      pattern: /(import .*";)/s,
      template: '$1\r\nimport { {{properCase name}} } from "./components/{{dashCase name}}/{{dashCase name}}.js";',
    },
    {
      type: 'modify',
      path: 'src/index.js',
      pattern: /(setupComponents\(\[(\{.*\})*)\]/s,
      templateFile: 'plop-templates/js.snippet.hbs',
    },
    ],
  });
};
