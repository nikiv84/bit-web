var observer = function (name) {

    var myName = name;
    var notify = function (message) {
        console.log(myName + ": Desilo se - " + message);
    }

    return {
        notify: notify
    }
}

var observer2 = function (name) {

    var myName = name;
    var notifyMe = function (message) {
        console.log(myName + ": Desilo se - " + message);
    }

    return {
        notifyMe: notifyMe
    }
}


var subject = function () {
    var observers = [];


    var check = function () {
        for (var i = 0; i < 100; i++) {
            if (i % 11 === 0) {
                notifyAll(i);
            }
        }
    }

    var notifyAll = function (number) {
        for (var i = 0; i < observers.length; i++) {
            observers[i](number);
        }
    }

    var addObserver = function (observer) {
        observers.push(observer);
    }
    return {
        notifyAll: notifyAll,
        addObserver: addObserver,
        check: check
    }
}

var s1 = subject();

var obs1 = observer("Lampica");
var obs2 = observer("Sirena");
var obs3 = observer2("Specijalni");

s1.addObserver(obs1.notify);
s1.addObserver(obs2.notify);
s1.addObserver(obs3.notifyMe);
s1.check();