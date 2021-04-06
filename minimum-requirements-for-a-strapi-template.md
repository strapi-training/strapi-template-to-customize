# Minimum Requirements for a Strapi Template Repo
Following are the hard requirements for a bare-bones, [strapi template](https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/installation/templates.html) repo.

Optional features are also included below .

# Hard Requirements

## ❗️ Publicly Accessible Repo
A publicly accessible, Github repo is required so that the [strapi create CLI](https://github.com/strapi/strapi/tree/master/packages/create-strapi-app) can do its work.

**Make sure your starter repo is public**.


## ❗️ `template.js|json` File

A `template.json` or `template.js` file is required to reside in the root folder of your strapi starter repo.  It extends the generated, strapi app's default `package.json`.

`template.json`'s contents are simply: 
```
{
  "package": {
      // normal `package.json` nodes in here, that will **EXTEND** the strapi app's `package.json`
  }
}
```

If you use a `template.js` (i.e. Javascript) file, you will have to export the `package` node like below: 
```
module.exports = function(scope) {
  return {
    package: {
        // normal `package.json` nodes in here, that will **EXTEND** the strapi app's `package.json`
      },
    },
  };
};
```
where `scope` is the strapi scope context. 

## ❗️ `template` Folder

The `template` folder extends the file contents of the strapi web app.

TODO

# Optional Features

## Optional: Strapi Naming Convention

The [create strapi CLI](https://github.com/strapi/strapi/tree/master/packages/create-strapi-app) uses a convention that allows custom starters to be referenced by their corresponding shortcut name.  

To provide this convnetion in your custom strapi template, be sure to name your strapi template repo using the following pattern:

`strapi-template-<your_template_name>`

where `<your_template_name>` is typically something that indicates what the the final app facilitates--e.g. a blog template like [this one](https://github.com/strapi/strapi-template-blog). 

Now, when we use our strapi template on the command line, we could type something like: 

```
yarn create strapi-app <new_project_folder_name> --template <your_github_org_or_username>/<your_template_name>
```

## Convenient Checklist
Use this checklist as you are creating and customizing your dev team's strapi starter: 
- [X] Visit and watch [strapi.training](https://strapi.training) (TBD) video
- [ ] [Ensure Github repo is public](TODO gh link)
- [ ] Have your [`template.js|json` in the root folder](TODO link)
- [ ] [Modify or replace the `template` folder](TODO link)

