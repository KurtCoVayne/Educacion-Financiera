$(document).ready(function () {

    $('.btn-td').click(function (e) {
        const result = window.confirm('Estás seguro que deseas eliminar la transacción?\nNo puedes revertir esta acción');
        if (result == false) {
            e.preventDefault();
        };
    });
    listenCreditOptions()
    //Sistema de prestamos
    function listenCreditOptions() {
        $('.amount').click(function (e) {
            let container = $('#amount-container')
            let form = $('#form-group')
            container.empty();
            container.append(this)
            container.append(`<button type="button" class="btn btn-warning btn-sm ml-2" id="backA"><i class="fas fa-arrow-left"></i></button>`)
            listenBackOption()
            $('#amountValue').remove()
            form.append(`<input type="hidden" name="amount" value="${this.value}" id="amountValue">`)
            // console.log(this.value, container)
        })
        $('.dues').click(function (e) {
            let container = $('#dues-container')
            let form = $('#form-group')
            container.empty();
            container.append(this)
            container.append(`<button type="button" class="btn btn-warning btn-sm ml-2" id="backD"><i class="fas fa-arrow-left"></i></button>`)
            listenBackOption()
            $('#duesValue').remove()
            form.append(`<input type="hidden" name="dues" value="${this.value}" id="duesValue">`)
            // console.log(this.value, container)
        })
    }
    function listenBackOption() {
        $('#backA').click(function (e) {
            let container = $('#amount-container')
            container.empty()
            container.append(`<input type="button" class="btn btn-info amount mr-2" name="amount"  value="5000">`)
            container.append(`<input type="button" class="btn btn-info amount mr-2" name="amount"  value="10000">`)
            container.append(`<input type="button" class="btn btn-info amount" name="amount" value="15000">`)
            $('#amountValue').remove()
            listenCreditOptions()
        })
        $('#backD').click(function (e) {
            let container = $('#dues-container')
            container.empty()
            container.append(`<input type="button" class="btn btn-info dues mr-2" name="dues" value="12">`)
            container.append(`<input type="button" class="btn btn-info dues mr-2" name="dues"  value="24">`)
            container.append(`<input type="button" class="btn btn-info dues" name="dues"  value="36">`)
            $('#duesValue').remove()
            listenCreditOptions()
        })
    }
    $('#btn-cd').click(function (e) {
        const amountContainer = $('#amount-container')
        const duesContainer = $('#dues-container')
        if (amountContainer.children().length > 2) {
            alert('Debes seleccionar el monto del prestamo')
            e.preventDefault()
            return
        } if (duesContainer.children().length > 2) {
            alert('Debes seleccionar la cantidad de cuotas')
            e.preventDefault()
            return
        }
        let amount = parseInt($('.amount').val())
        let interes = parseInt(amount * 0.05)
        let dues = $('.dues').val()
        const div = parseFloat((amount+intereses)) / dues
        console.log(div)
        const result = window.confirm('Estás a punto de solicitar el siguiente credito' +
            '\nMonto de la deuda: ' + amount +
            '\nCantidad de cuotas: ' + dues +
            '\nCobro por cuota: ' + div +
            '\nIntereses: ' + interes +
            '\nEsto significa que tendras una deuda de ' + amount + '  y tendrás que pagarla en ' + dues + ' cuotas de ' + div +
            '\nDeseas proceder?');
        if (result === false) {
            e.preventDefault();
        };
    });
});
